import os 
import sys 
import numpy as np
import requests 
import logging
import urllib
import json
import datetime as dt
from datetime import date
from datetime import datetime
import pandas as pd
from tensorflow.python.util.tf_inspect import Parameter

today = date.today()
######################################################################
class aqms_api_class(object):
      """
      This class defines and configures the API to query the Azure DataWarehous
      """
      def __init__(self, ):
            self.logger = logging.getLogger(__file__) 
            self.url_api = "https://data.airquality.nsw.gov.au"
            self.headers = {'content-type':'application/json', 'accept':'application/json'}
            
            self.get_site_url = "api/Data/get_SiteDetails"
            self.get_parameters = "api/Data/get_ParameterDetails"
            self.get_observations = "api/Data/get_Observations"
            
            return 

######################################################################

      def get_Obs (self,ObsRequest):
            """
            Build a query to return all the Current hourly obs 
            """
            query = urllib.parse.urljoin(self.url_api, self.get_observations) 
            response = requests.post(url = query, data= json.dumps(ObsRequest), headers=self.headers)  
            return response

# ######################################################################
      def ObsRequest_init(self, parameter='PM2.5', start_date = '2023-05-01', end_date = date.today()):
            """
                  Build a query to return all historical OBS to the present
                  Check the parameter for approriate frequency
            """
            ObsRequest  = {}
            ObsRequest['Parameters'] = [parameter]
            ObsRequest['Sites']= [107]   ## Liverpool : 107
       
            ObsRequest['StartDate'] = start_date
            ObsRequest['EndDate'] = end_date.strftime('%Y-%m-%d')
            ObsRequest['Categories'] = ['Averages']
            ObsRequest['SubCategories'] = ['Hourly']
            # ObsRequest['Frequency'] = ['24h rolling average derived from 1h average']
            ObsRequest['Frequency'] = ['Hourly average']
            return ObsRequest

# ######################################################################
def get_values(text, parameter):
      '''
            Getting OBS WITHOUT convertion datetime to index
      '''
      values = text.split(',')
      date_obs = []
      hour = []
      obs = []
      for i in values:
            if ('"Date"') in i:
                  date_obs.append(i[8:18])
            if ('"Hour"') in i:
                  hour.append(int(i[7:]))
            if ('"Value"') in i:
                  obs.append((i[8:len(i)-2]))

      df = {'Date': (date_obs), 'Hour': (hour), parameter: (obs)}
      OBS = pd.DataFrame(df)
      return OBS

# ######################################################################
def get_values_indexdt(parameter='PM2.5', start_date = date.today(),  end_date = date.today()):
      '''
            Getting OBS with convertion datetime to index of dataframe
      '''
      start_date = start_date 
      end_date = end_date
      AQMS = aqms_api_class()
      ObsRequest = AQMS.ObsRequest_init(parameter, start_date, end_date)
      AllCurrentObs = AQMS.get_Obs(ObsRequest)
      
      """
      Save curent hourly obs to a text file
      """
      values  =''
      
      # f = open('CurrentObs.txt', 'w') # open a file in write mode 
      for item in AllCurrentObs: # iterate over the list items 
            item = item.decode("ISO-8859-1") # remove b from check process 
            # f.write(str(item) + '\n') # write to the file in working directory f.close() 
            values = values + str(item)
      # f.close()

      ### splitting json string into list of parameters of "key":value
      values = values.split(',')

      ### Extracting date - time - values
      date_obs = []
      hour = []
      obs = []

      for i in values:
            if ('"Date"') in i:
                  date_obs.append(i[8:18])
            if ('"Hour"') in i:
                  hour.append(int(i[7:]))
            if ('"Value"') in i:
                  obs.append((i[8:len(i)-1]))
      # obs[-1] = obs[-1][:-1]           
     
      hour_obs = [item-1 for item in hour]
      dt_obs = []
      for i in range(len(date_obs)):
            dt_obs.append(date_obs[i]+ ' ' + str(hour_obs[i]) + ':00') 


      df = {'datetime': (dt_obs), parameter: (obs)}
      df = pd.DataFrame(df)
      df['datetime'] = pd.to_datetime(df['datetime'], dayfirst=True)
      ### Set index column
      df.set_index('datetime', inplace = True)
      ### Replace "null" string to nan for dropping
      df= df.replace('nul*', np.nan, regex=True)
      df = df.dropna()
      # print(df)
      ### Convert data to float
      df[parameter] =pd.to_numeric(df[parameter], downcast="float")
      # print(df[obs])
      print("_____Extract successfully " + parameter +" from API____")
      return df

######################################################################
if __name__ == '__main__':

      obs = 'PM2.5'
      # OBS = get_values(k, parameter)    ### getvalue without datetime index
      OBS_dt = get_values_indexdt(obs, '2023-05-09 00:00')
      
      ### Print out for checking results
      pd.set_option("display.max_rows", None, "display.max_columns", None)
      print(OBS_dt)

      # ### Save to csv file
      # OBS_dt.to_csv('current{}.csv'.format(obs))