
"""The prediction model with Bi-directional LSTM model - two inputs: OBS-CTM 
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


import get_currentOBS as getOBS         ### Get OBS from API-DPIE

#########@ Data initialisation @############
tf.random.set_seed(2)
np.random.seed(2)
today = datetime.date.today()
now = datetime.datetime.now()
print(now.hour)
print(now.date)

n_input = 12

######## Processig data functions ###########
### function for making the sequence of input for predicting
def rolling_input(data, n_input, n_features):
    input_sequence = []
    count = 0
    # data = data.values
    for i in range(len(data)-n_input):
            input_temp = data[i:i+n_input,:]
            if np.isnan(input_temp).any():
                  count  = count + np.isnan(input_temp).any().sum()
                  input_temp = pd.DataFrame(input_temp).fillna(np.nanmean(input_temp))      ### fillna with mean of remaining values of all features OBS and CTM
                  input_temp = np.array(input_temp)
            input_temp = input_temp.reshape(1, len(input_temp),  n_features)
            input_sequence.append(input_temp)
    print("Number of NaN: ", count )
    return input_sequence


#######@ Loading model @####################
model = tf.keras.models.load_model('OZ_Bimultivariate_model.h5')
# model = tf.keras.models.load_model('PM_single_model.h5')

app = Flask(__name__)


@app.route('/')
def home():
    # values, labels  = data_label()
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    obs_done = ''
    start_date = ''
    # OBS = []
    if request.method == 'POST':
        print("hello")
        if request.form.get('getObs') == 'VALUE1':
            get = [x for x in request.form.values()]
            # #######@ Getting data from API @#############
            # # obs = 'PM10'
            # obs = 'OZONE'
            start_date = get[0]
            # end_date = today
            # data_OBS = getOBS.get_values_indexdt(obs, start_date, end_date)
            # obs_done = start_date
            # ###########################
            # OBS = np.array(data_OBS[obs])


            df = pd.read_csv('OZ_Liverpool_2013.csv', header=0, infer_datetime_format=True, 
                    dayfirst = True, parse_dates=['datetime'], index_col=['datetime'])

            data = df.values    ## data 1st column is CTM and 2nd column is OBS

            n_features = data.shape[1]  ## number of columns

            ### Scale data to [0,1]
            scaler = MinMaxScaler(feature_range=(0, 1))
            data.reshape(len(data), data.shape[1])
            data = scaler.fit_transform(data)

            input_sequence = rolling_input(data, n_input, n_features)
            print(input_sequence[-1])

            pred= []
            for i in range(len(input_sequence)):
                temp = model.predict(input_sequence[i])
                pred.append(temp[0])
                
            pred = np.array(pred).reshape(len(pred), 1)
            pred = np.repeat(pred, n_features, axis = -1) 

            ############@ reverse scale @############
            prediction = scaler.inverse_transform(pred)[:,-1]
            data = scaler.inverse_transform(data)

            ##### zeros the negative prediction ####
            prediction [prediction  < 0] = 0

            actual_OBS = data[-len(prediction):, -1]
            days = df.index[-len(actual_OBS):]
            labels = [str(x) for x in days]

            

            values = actual_OBS.tolist()
            forecast = prediction.tolist()

            print("Len:")
            print(len(values))
            print(len(forecast))
            print(len(labels))
            # rmse  = sqrt(mean_squared_error(values, forecast))
            rmse = 1
            output_error = np.round(rmse,3)

            print(values[:3])
            print(forecast[:3])

            #### Pop up results from prediction
            return render_template('index.html', prediction_text='\n RMSE between OBS and forecast: {}'.format(output_error),  
                GetOBS_text = "Get OBS from {}".format(obs_done), labels= labels, values = values, forecast = forecast)


if __name__ == "__main__":
    app.run(debug=True)
    print("start")
