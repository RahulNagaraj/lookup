# Extends jupyter/datascience-notebook
FROM jupyter/datascience-notebook

WORKDIR /usr/app/lookup/jupyter

# Copies example Jupyter notebook
COPY ./ .

# Installs pymongo and zipline library, jupyter-c-kernel
RUN pip install yelpapi pymongo zipline jupyter-c-kernel
# RUN install_c_kernel