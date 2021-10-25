FROM node:10

# Install our basic requirements
# RUN apt-get update && \
#       apt-get install --no-install-recommends --no-install-suggests -q -y \
#       apt-transport-https \
#       apt-utils \
#       build-essential \
#       dirmngr \
#       gnupg \
#       htop \
#       lsb-release \
#       openssl \
#       # python3 \
#       python-setuptools \
#       software-properties-common \
#       vim-nox \
#       procps \
#       lsof \
#       wget \
#       git \
#       && \
#       DEBIAN_FRONTEND=noninteractive apt-get autoremove -y && \
#       DEBIAN_FRONTEND=noninteractive apt-get autoclean && \
#       DEBIAN_FRONTEND=noninteractive apt-get clean && \
#       rm -Rf /var/lib/apt/lists/* /usr/share/man/* /usr/share/doc

WORKDIR /usr/app/lookup_service/server

COPY package.json ./

RUN npm install nodemon -g

COPY . ./

RUN npm install

# Default command
EXPOSE 8000
CMD ["npm", "start"]