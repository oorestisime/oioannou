import os
import sys
from argh import *
from flask import Flask, render_template, abort, request, session, g, redirect, url_for, flash
from flask import Markup
from flask_flatpages import FlatPages
from flask_frozen import Freezer

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'

app = Flask(__name__)
freezer = Freezer(app)

app.config.from_object(__name__)
pages = FlatPages(app)


app.config.from_envvar('FLASKR_SETTINGS', silent=True)


@app.route('/')
@app.route('/index/')
def index():
    return render_template('index.html',
                           onProjects=select_pages("OnProjects", 3),
                           cProjects=select_pages("cProjects", 3),
                           blogs=select_pages("Blog", 3))


def select_pages(keyword, limit):
    selected = (p for p in list(pages) if p.meta['published'] == True and p.meta['category'] == keyword)
    # Show the 10 most recent articles, most recent first.
    latest = sorted(selected, reverse=True, key=lambda p: p.meta['date'])
    return latest[:limit]


@app.route('/<path:path>/')
def page(path):
    page = pages.get_or_404(path)
    if not page.meta.get('published', False):
        abort(404)
    return render_template('page.html', page=page)

@app.route('/contact/')
def contact():
  return render_template('contact.html')

'''@app.route('/contact/', methods=['GET', 'POST'])
def contact():
  form = ContactForm()
  if request.method == 'POST':
    if form.validate() == False:
      flash('All fields are required.')
      return render_template('contact.html', form=form)
    else:
      msg = Message(form.subject.data, sender='oorestisime@gmail.com', recipients=['oorestisime@gmail.com'])
      msg.body = """
      From: %s <%s>
      %s
      """ % (form.name.data, form.email.data, form.message.data)
      mail.send(msg)
      return render_template('contact.html', success=True, form=form)
  elif request.method == 'GET':
    return render_template('contact.html', form=form)'''

@app.route('/software/')
def software():
  return render_template('software.html')


@app.route('/ongoing/')
def ongoing():
  return render_template('ongoing.html',pages=select_pages("OnProjects",1000))

@app.route('/completed/')
def completed():
  return render_template('completed.html',pages=select_pages("cProjects",1000))

@app.route('/blog/')
def blog():
  return render_template('blog.html',pages=select_pages("Blog",1000))

@app.route('/archive/')
def archive():
  published= [p for p in pages if p.meta['published']==True]
  sorted_list = sorted(published, reverse=True, key=lambda p: p.meta['date'])
  return render_template('archive.html',pages=sorted_list)

@app.route('/tag/<string:tag>/')
def tag(tag):
    tagged = [p for p in pages if tag in p.meta.get('tags', []) and p.meta['published']==True]
    return render_template('tag.html', pages=tagged, tag=tag)



if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(host='0.0.0.0')
    


###############################################################################
# Commands
'''@command
def build():
  print("Building website...")
  app.debug = False
  freezer.freeze()
  print("Done.")

@command
def serve(server='127.0.0.1', port=5000, debug=DEBUG):
  asset_manager.config['ASSETS_DEBUG'] = debug
  if debug:
    app.debug = True
    app.run(host=server, port=port, debug=debug)


@command
def deploy():
build()
local("rsync -avz -e ssh --exclude-from=rsync_exclude.txt "
"./build/ server path")



if __name__ == '__main__':
  parser = ArghParser()
  parser.add_commands([build, serve, ])
  parser.dispatch()
'''