/* ============================================================
* Falkon - Qt web browser
* Copyright (C) 2010-2014  David Rosca <nowrep@gmail.com>
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
#ifndef SQUEEZELABELV2_H
#define SQUEEZELABELV2_H

#include "qzcommon.h"

#include <QLabel>

class MIDORI_EXPORT SqueezeLabelV2 : public QLabel
{
    Q_OBJECT

public:
    explicit SqueezeLabelV2(QWidget* parent = nullptr);
    SqueezeLabelV2(const QString &string);

    QString originalText();
    void setText(const QString &txt);

private Q_SLOTS:
    void copy();

protected:
    void contextMenuEvent(QContextMenuEvent* event) override;
    void keyPressEvent(QKeyEvent* event) override;
    void resizeEvent(QResizeEvent* event) override;

    void mousePressEvent(QMouseEvent* event) override;
    void mouseMoveEvent(QMouseEvent* event) override;

private:
    QString m_originalText;
    QPoint m_dragStart;
};

#endif // SQUEEZELABELV2_H
