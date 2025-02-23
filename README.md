# Corn Classification
## Our Project
Welcome to our submission for MadData25, University of Wisconsin-Madison's premier data-based hackathon! We created a model to predict corn yield, in tons per acre, from a region's past 3 years of weather data, including average monthly temperature and precipitation totals.

### How It's Made:
Tech used: Python, R, HTML
We decided to use U.S. states' weather data (1975-2024) and the annual corn yields by state. We then sorted these states into different regions:
1. Humid coastal cold
2. Humid inland cold
3. Humid coastal hot
4. Humid inland hot
5. Dry inland hot
6. Dry inland cold
7. Dry coastal cold
8. Dry coastal hot

We loaded and cleaned all of our weather and corn yield data in R. Since we pulled the datasets from many different sources, we condensed the data into state-specific dataframes. We implemented a deep neural network (DNN) to find relationships between our weather data, regions, and crop yields, and make corn yield predictions.

## Uses
We hope that this project can be used by farmers, agrobusiness companies, local governments, and others to predict corn yield in different parts of the world with similar regions as the U.S.

## Challenges
TODO

## Limitations
We didn't have access to a web-hosting service, so we weren't able to implement a more robust, dynamic app.

## Instructions for Use
To use this model please dowload the requities python libraries (we recommend using a virtual environment for this) using the following commands:
'''
pip3 install flask
pip3 install flask-cors
pip3 install torch
pip3 install numpy
'''

## Contact Information
TODO

## Sources
NOAA National Centers for Environmental information, Climate at a Glance: Statewide Time Series,   
  published February 2025, retrieved on February 22, 2025 from https://www.ncei.noaa.gov/access/
  monitoring/climate-at-a-glance/statewide/time-series
USDA National Agricultural Statistics Service, retrieved on February 22, 2025 from https://  
  quickstats.nass.usda.gov/
