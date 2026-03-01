FROM squidfunk/mkdocs-material

COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /docs

EXPOSE 8000

CMD ["serve", "--dev-addr=0.0.0.0:8000", "--livereload", "--dirtyreload"]