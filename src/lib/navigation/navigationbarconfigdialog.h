/* ============================================================
* Falkon - Qt web browser
* Copyright (C) 2018 David Rosca <nowrep@gmail.com>
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
#pragma once

#include <QDialog>

#include "qzcommon.h"

class QAbstractButton;

class NavigationBar;

namespace Ui
{
class NavigationBarConfigDialog;
}

class MIDORI_EXPORT NavigationBarConfigDialog : public QDialog
{
public:
    explicit NavigationBarConfigDialog(NavigationBar *navigationBar);

private:
    void loadSettings();
    void saveSettings();
    void resetToDefaults();

    void buttonClicked(QAbstractButton *button);

    Ui::NavigationBarConfigDialog* ui;
    NavigationBar *m_navigationBar;
};
