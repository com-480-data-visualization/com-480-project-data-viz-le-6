# Graph visualization
__Goal__ : visualize Aline Skiing world cup seasons in a graph

## Graph description
__Node__ : athlete

__Edge__ : an edge between two athletes say that both have participated in the same race at least T times during the season

T is a threshold parameter.

## Compute the graphs
The notebook ski_graph.ipynb allows you to generate the graphs and save the graph in json.
The default path is : *./data/graph_[M|W]_YEAR.json* where *M|W* specify the gender and *YEAR* the season.

## Visualize the graphs
Once the graphs are computed (with default path) as described in the previous point, you can visualize them in the browser.

In this directory, run a webserver :

 ```
python -m http.server PORT_NUMBER --bind 127.0.0.1
 ```

PORT_NUMBER being your prefered available port number.

Then access the following web page :
http://localhost:PORT_NUMBER/graph.html