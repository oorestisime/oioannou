from random import randint
from subprocess import call
from datetime import datetime

from argh import *
from flask import Flask, render_template, abort, request, redirect
from flask_flatpages import FlatPages
from flask_frozen import Freezer
from urlparse import urljoin
from werkzeug.contrib.atom import AtomFeed


DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'

app = Flask(__name__)
freezer = Freezer(app)

app.config.from_object(__name__)
pages = FlatPages(app)


app.config.from_envvar('FLASKR_SETTINGS', silent=True)


''' HELPERS '''


def select_pages(keyword, limit):
    selected = (p for p in list(pages) if p.meta[
                'published'] is True and keyword in p.meta['category'])
    # Show the 10 most recent articles, most recent first.
    latest = sorted(selected, reverse=True, key=lambda p: p.meta['date'])
    return latest[:limit]


def make_external(url):
    return urljoin(request.url_root, url)


def count_tags():
    articles = (p for p in list(pages) if p.meta['published'] is True)
    tags = dict()
    for article in articles:
        for tag in article.meta['tags']:
            if tag not in tags.keys():
                tags[tag] = 110
            else:
                tags[tag] += 15
    return [(k, v) for k, v in tags.iteritems()]


''' ROUTING '''


@app.route('/')
def index():
    return render_template('index.html',
                           onProjects=select_pages("OnProjects", 3),
                           cProjects=select_pages("cProjects", 3),
                           blogs=select_pages("Blog", 3))


@app.route('/<path:path>/')
def page(path):
    page = pages.get_or_404(path)
    if not page.meta.get('published', False):
        abort(404)
    return render_template('page.html', page=page)


@app.route('/contact/')
def contact():
    return render_template('contact.html')


@app.route('/software/')
def software():
    return render_template('software.html')


@app.route('/about/')
def about():
    return render_template('about.html')


@app.route('/ongoing/')
def ongoing():
    return render_template('ongoing.html',
                           pages=select_pages("OnProjects", 1000))


@app.route('/completed/')
def completed():
    return render_template('completed.html',
                           pages=select_pages("cProjects", 1000))


@app.route('/blog/')
def blog():
    return render_template('blog.html', pages=select_pages("Blog", 1000))


@app.route('/archive/')
def archive():
    published = [p for p in pages if p.meta['published'] is True]
    sorted_list = sorted(published, reverse=True, key=lambda p: p.meta['date'])
    return render_template('archive.html',
                           pages=sorted_list, keyword="Complete")


@app.route('/tag/')
def cloud():
    return redirect('tags', 302)


@app.route('/tags/')
def tags():
    cloud = count_tags()
    cols = []
    rb = randint(50, 100)
    for i in enumerate(cloud):
        cols.append((randint(120, 255), rb, rb))
    return render_template('cloud.html', tags=cloud, cols=cols)


@app.route('/tag/<string:tag>/')
def tag(tag):
    tagged = [p for p in pages if tag in p.meta.get(
        'tags', []) and p.meta['published'] is True]
    return render_template('tag.html', pages=tagged, tag=tag)


@app.route('/year/<string:year>/')
def year(year):
    result = [p for p in pages if p.meta['published'] is
              True and year in p.meta['date'].strftime('%Y/%m/%d')]
    return render_template("archive.html", pages=result, keyword=year)


@app.route('/recent.atom')
def recent_feed():
    feed = AtomFeed('Recent Articles',
                    feed_url=request.url, url=request.url_root)
    published = [p for p in pages if p.meta['published'] is True]
    articles = sorted(published, reverse=True,
                      key=lambda p: p.meta['date'])[0:15]
    for article in articles:
        feed.add(article.meta['title'], unicode(article.html),
                 content_type='html',
                 author=article.meta['author'],
                 url=make_external(article.path),
                 updated=datetime.combine(article.meta['date'],
                                          datetime.min.time()),
                 published=datetime.combine(article.meta['date'],
                                            datetime.min.time()))
    return feed.get_response()


''' End of routing

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(host='0.0.0.0')'''


''' Inspired by Nicolas Periault'''


@command
def build():
    print("Building website...")
    app.debug = False
    freezer.freeze()
    print("Done.")


@command
def serve():
    app.run(host='0.0.0.0')


@command
def deploy():
    build()
    print("syncing...")
    call(["rsync", "-avz", "./build/", "entropio:public_html/oioannou/"])


if __name__ == '__main__':
    parser = ArghParser()
    parser.add_commands([build, serve, deploy])
    parser.dispatch()
