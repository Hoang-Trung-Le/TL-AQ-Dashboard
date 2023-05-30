
"""The prediction model with Bi-directional LSTM model - single input OBS 
      author: Hubert Nguyen
      email: hubert.nguyen@environment.nsw.gov.au

      ### RUN with this command: python -m flask run
"""
from inspect import EndOfBlock
from flask import Flask, request, jsonify, render_template

from math import sqrt
from numpy import split
from numpy import array
import numpy as np
from numpy import hstack
from numpy.core.fromnumeric import mean
from pandas import read_csv
from pandas import DataFrame
from sklearn.metrics import mean_squared_error
from matplotlib import pyplot
from keras.models import Sequential
from keras.layers import Dropout
from keras.layers import LSTM
from keras.layers import Dense
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
from tensorflow.keras.optimizers import Adam
from keras.layers import RepeatVector
from keras import regularizers

from numpy import mean
from numpy import std

import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from sklearn.metrics import r2_score
from keras.layers import Bidirectional
import datetime

import csv
import json


import get_currentOBS as getOBS         ### Get OBS from API-DPIE

#########@ Data initialisation @############
tf.random.set_seed(2)
np.random.seed(2)
today = datetime.date.today()
now = datetime.datetime.now()
print(now.hour)
print(now.date)

n_input = 12
n_features = 1

######## Processig data functions ###########
### function for making the sequence of input for predicting
def rolling_input(data, n_input, n_features):
    input_sequence = []
    count = 0
    # data = data.values
    for i in range(len(data)-n_input):
            input_temp = data[i:i+n_input,-1]
            if np.isnan(input_temp).any():
                  count  = count + np.isnan(input_temp).any().sum()
                  # print(np.isnan(input_temp).any().sum())
                  input_temp = pd.DataFrame(input_temp).fillna(np.nanmean(input_temp))      ### fillna with mean of remaining values of all features OBS and CTM
                  
                  input_temp = np.array(input_temp)
                  print(input_temp)
            input_temp = input_temp.reshape(1, len(input_temp), n_features)
            input_sequence.append(input_temp)
    print("Number of NaN: ", count )
    return input_sequence


###########@ Loading DL pretrained model @####################
model = tf.keras.models.load_model('OZ_single_model.h5')
# model = tf.keras.models.load_model('PM_single_model.h5')

app = Flask(__name__)


@app.route('/')
def home():
    # values, labels  = data_label()
    return render_template('index.html')

####### task when doing the click on button ################
@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    obs_done = ''
    start_date = ''
    # OBS = []
    ########### Firstly - getting API data from DPE ############
    if request.method == 'POST':
        if request.form.get('getObs') == 'VALUE1':
            get = [x for x in request.form.values()]
            #######@ Getting data from API @#############
            #### Declare the type of pollutant
            # obs = 'PM10'
            obs = 'OZONE'

            start_date = get[0]     ### Starting date of historical data being received from the textbox on WebApp

            end_date = today        ### Data get until today

            data_OBS = getOBS.get_values_indexdt(obs, start_date, end_date)
            obs_done = start_date
            ########## Data processing and predicting ############
            OBS = np.array(data_OBS[obs])
            scaler = MinMaxScaler(feature_range=(0, 1))
            OBS = OBS.reshape((len(OBS), 1))
            OBS.reshape(len(OBS), n_features)
            OBS = scaler.fit_transform(OBS)
            
            input_sequence = rolling_input(OBS, n_input, n_features)
            print(input_sequence[-1])

            ### Making prediction (this is single step mdoel) ###
            prediction= []
            for i in range(len(input_sequence)):
                temp = model.predict(input_sequence[i])
                prediction.append(temp[0])
                
            prediction = np.array(prediction)
            prediction = prediction.reshape(len(prediction),1)

            ############@ reverse scale @############
            prediction = scaler.inverse_transform(prediction)
            OBS = scaler.inverse_transform(OBS)

            ##### zeros the negative prediction ####
            prediction [prediction  < 0] = 0

            actual_OBS = OBS[-len(prediction):,0]
            days = data_OBS.index[-len(actual_OBS):]
            labels = [str(x) for x in days]

            values = actual_OBS.tolist()
            forecast = prediction[:,0].tolist()

            print("_____Extract forecast successfully____")
            print(forecast)
            # Convert forecast to a list of dictionaries
            forecast_data = [{'forecast': value} for value in forecast]
            # Export to CSV
            csv_file = 'forecast101.csv'
            keys = ['forecast']  # Specify the column name(s) in the CSV file
            with open(csv_file, 'w', newline='') as file:
                writer = csv.DictWriter(file, fieldnames=keys)
                writer.writeheader()
                writer.writerows(forecast_data)

            # Convert forecast to a list
            

            # Export to JSON
            json_file = 'forecast.json'
            with open(json_file, 'w') as file:
                json.dump(forecast, file)


            rmse  = sqrt(mean_squared_error(values, forecast))
            output = np.round(rmse,3)
            return render_template('index.html', prediction_text='\n RMSE between OBS and forecast: {}'.format(output),  
                GetOBS_text = "Get OBS from {}".format(obs_done), labels= labels, values = values, forecast = forecast)


if __name__ == "__main__":
    app.run(debug=True)
