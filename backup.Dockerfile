FROM python:3.10.8
RUN apt update
RUN apt -y install default-mysql-client
COPY ./mysql/ /home/mysql/
WORKDIR /home/mysql/
RUN pip install -r requirements.txt
CMD ["/bin/bash"]