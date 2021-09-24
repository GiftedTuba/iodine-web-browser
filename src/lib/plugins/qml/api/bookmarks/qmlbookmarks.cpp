/* ============================================================
* Falkon - Qt web browser
* Copyright (C) 2018 Anmol Gautam <tarptaeya@gmail.com>
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
* ============================================================ */
#include "qmlbookmarks.h"
#include "bookmarks.h"
#include "qml/qmlstaticdata.h"
#include <QDebug>
#include <QQmlEngine>

QmlBookmarks::QmlBookmarks(QObject *parent)
    : QObject(parent)
{
    connect(mApp->bookmarks(), &Bookmarks::bookmarkAdded, this, [this](BookmarkItem *item){
        QmlBookmarkTreeNode * treeNode = QmlStaticData::instance().getBookmarkTreeNode(item);
        emit created(treeNode);
    });

    connect(mApp->bookmarks(), &Bookmarks::bookmarkChanged, this, [this](BookmarkItem *item){
        QmlBookmarkTreeNode * treeNode = QmlStaticData::instance().getBookmarkTreeNode(item);
        emit changed(treeNode);
    });

    connect(mApp->bookmarks(), &Bookmarks::bookmarkRemoved, this, [this](BookmarkItem *item){
        QmlBookmarkTreeNode * treeNode = QmlStaticData::instance().getBookmarkTreeNode(item);
        emit removed(treeNode);
    });
}

BookmarkItem *QmlBookmarks::getBookmarkItem(QmlBookmarkTreeNode *treeNode) const
{
    Bookmarks * bookmarks = mApp->bookmarks();
    QList<BookmarkItem*> items;

    if (treeNode->url().isEmpty()) {
        if (treeNode->item() == bookmarks->rootItem()) {
            return bookmarks->rootItem();

        } else if (treeNode->item() == bookmarks->toolbarFolder()) {
            return bookmarks->toolbarFolder();

        } else if (treeNode->item() == bookmarks->menuFolder()) {
            return bookmarks->menuFolder();

        } else if (treeNode->item() == bookmarks->unsortedFolder()) {
            return bookmarks->unsortedFolder();
        }

        items = bookmarks->searchBookmarks(treeNode->title());
    } else {
        items = bookmarks->searchBookmarks(QUrl::fromEncoded(treeNode->url().toUtf8()));
    }

    for (BookmarkItem *item : qAsConst(items)) {
        if (treeNode->item() == item) {
            return item;
        }
    }

    return nullptr;
}

BookmarkItem *QmlBookmarks::getBookmarkItem(QObject *object) const
{
    QmlBookmarkTreeNode * treeNode = qobject_cast<QmlBookmarkTreeNode*>(object);
    if (!treeNode) {
        return nullptr;
    }

    BookmarkItem * item = getBookmarkItem(treeNode);
    if (!item || item->urlString() != treeNode->url()) {
        return nullptr;
    }

    return item;
}

bool QmlBookmarks::isBookmarked(const QString &url) const
{
    return mApp->bookmarks()->isBookmarked(QUrl::fromEncoded(url.toUtf8()));
}

QmlBookmarkTreeNode *QmlBookmarks::rootItem() const
{
    return QmlStaticData::instance().getBookmarkTreeNode(mApp->bookmarks()->rootItem());
}

QmlBookmarkTreeNode *QmlBookmarks::toolbarFolder() const
{
    return QmlStaticData::instance().getBookmarkTreeNode(mApp->bookmarks()->toolbarFolder());
}

QmlBookmarkTreeNode *QmlBookmarks::menuFolder() const
{
    return QmlStaticData::instance().getBookmarkTreeNode(mApp->bookmarks()->menuFolder());
}

QmlBookmarkTreeNode *QmlBookmarks::unsortedFolder() const
{
    return QmlStaticData::instance().getBookmarkTreeNode(mApp->bookmarks()->unsortedFolder());
}

QmlBookmarkTreeNode *QmlBookmarks::lastUsedFolder() const
{
    return QmlStaticData::instance().getBookmarkTreeNode(mApp->bookmarks()->lastUsedFolder());
}

bool QmlBookmarks::create(const QVariantMap &map) const
{
    if (!map.contains(QStringLiteral("parent"))) {
        qWarning() << "Unable to create new bookmark:" << "parent not found";
        return false;
    }
    const QString title = map.value(QStringLiteral("title")).toString();
    const QString urlString = map.value(QStringLiteral("url")).toString();
    const QString description = map.value(QStringLiteral("description")).toString();

    BookmarkItem::Type type;
    if (map.contains(QStringLiteral("type"))) {
        type = BookmarkItem::Type(map.value(QStringLiteral("type")).toInt());
    } else if (urlString.isEmpty()){
        if (!title.isEmpty()) {
            type = BookmarkItem::Folder;
        } else {
            type = BookmarkItem::Invalid;
        }
    } else {
        type = BookmarkItem::Url;
    }

    QObject * object = map.value(QSL("parent")).value<QObject*>();
    BookmarkItem * parent = getBookmarkItem(object);
    if (!parent) {
        qWarning() << "Unable to create new bookmark:" << "parent not found";
        return false;
    }
    BookmarkItem * item = new BookmarkItem(type);
    item->setTitle(title);
    item->setUrl(QUrl::fromEncoded(urlString.toUtf8()));
    item->setDescription(description);
    mApp->bookmarks()->addBookmark(parent, item);
    return true;
}

bool QmlBookmarks::remove(QmlBookmarkTreeNode *treeNode) const
{
    BookmarkItem * item = getBookmarkItem(treeNode);
    if (!item) {
        qWarning() << "Unable to remove bookmark:" <<"BookmarkItem not found";
        return false;
    }
    return mApp->bookmarks()->removeBookmark(item);
}

QList<QObject*> QmlBookmarks::search(const QVariantMap &map) const
{
    if (!map.contains(QStringLiteral("query")) && !map.contains(QStringLiteral("url"))) {
        qWarning() << "Unable to search bookmarks";
        return QList<QObject*>();
    }

    const QString query = map.value(QStringLiteral("query")).toString();
    const QString urlString = map.value(QStringLiteral("url")).toString();
    QList<BookmarkItem*> items;
    if (urlString.isEmpty()) {
        items = mApp->bookmarks()->searchBookmarks(query);
    } else {
        items = mApp->bookmarks()->searchBookmarks(QUrl::fromEncoded(urlString.toUtf8()));
    }
    QList<QObject*> ret;
    ret.reserve(items.size());
    for (BookmarkItem * item : qAsConst(items)) {
        ret.append(QmlStaticData::instance().getBookmarkTreeNode(item));
    }
    return ret;
}

bool QmlBookmarks::update(QObject *object, const QVariantMap &changes) const
{
    QmlBookmarkTreeNode * treeNode = qobject_cast<QmlBookmarkTreeNode*>(object);
    if (!treeNode) {
        qWarning() << "Unable to update bookmark:" << "unable to cast QVariant to QmlBookmarkTreeNode";
        return false;
    }

    BookmarkItem * item = getBookmarkItem(treeNode);
    if (!item) {
        qWarning() << "Unable to update bookmark:" << "bookmark not found";
        return false;
    }

    if (!mApp->bookmarks()->canBeModified(item)) {
        qWarning() << "Unable to update bookmark:" << "bookmark can not be modified";
    }

    QString newTitle = treeNode->title();
    if (changes.contains(QStringLiteral("title"))) {
        newTitle = changes.value(QStringLiteral("title")).toString();
    }
    QString newDescription = treeNode->description();
    if (changes.contains(QStringLiteral("description"))) {
        newDescription = changes.value(QStringLiteral("description")).toString();
    }
    QString newKeyword = treeNode->keyword();
    if (changes.contains(QStringLiteral("keyword"))) {
        newKeyword = changes.value(QStringLiteral("keyword")).toString();
    }

    item->setTitle(newTitle);
    item->setDescription(newDescription);
    item->setKeyword(newKeyword);
    mApp->bookmarks()->changeBookmark(item);
    return true;
}

QmlBookmarkTreeNode *QmlBookmarks::get(const QString &string) const
{
    const QList<BookmarkItem*> items = mApp->bookmarks()->searchBookmarks(QUrl(string));
    for (BookmarkItem *item : items) {
        if (item->urlString() == string) {
            return QmlStaticData::instance().getBookmarkTreeNode(item);
        }
    }

    return nullptr;
}

QList<QObject*> QmlBookmarks::getChildren(QObject *object) const
{
    QList<QObject*> ret;

    BookmarkItem * bookmarkItem = getBookmarkItem(object);
    if (!bookmarkItem) {
        qWarning() << "Unable to get children:" << "parent not found";
        return ret;
    }

    const QList<BookmarkItem*> items = bookmarkItem->children();
    for (BookmarkItem *item : items) {
        ret.append(QmlStaticData::instance().getBookmarkTreeNode(item));
    }

    return ret;
}
