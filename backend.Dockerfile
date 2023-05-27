FROM python:3.9
RUN apt-get update
RUN apt-get -y install default-mysql-client
RUN apt-get install libjpeg62

COPY ./backend/requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
RUN rm /tmp/requirements.txt

COPY ./backend/ /root/backend/
WORKDIR /root/backend/

CMD ["/bin/bash"]