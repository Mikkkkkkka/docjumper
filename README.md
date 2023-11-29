# docjumper README

Добавляет удобную команду позволяющую быстро переключится на выбранный текстовый документ (например readme)

## For more information

**Автор расширения** - *Кашин Михаил* (333723)

M3113

Telegram: [@srryizonedout](https://t.me/srryizonedout/)

## Features

Добавляет три новые команды: Set Document и Show Set Document.

### Set Document:

Запоминает текстовый документ открытый в активном редакторе.

*Default shortcut: "Alt+Shift+Q"*

### Show Set Document:

    Открывает запомненный документ в соседней вкладке текстового редактора.
    По умолчанию запоминает \docs\README.md в открытой рабочей папке, пользователь может настроить путь документа запоминаемого по умолчанию.
*Default shortcut: "Alt+Q"*

### Reset Document:

Сбрасывает запомненный документ к документу по умолчанию.

## Configuration parameters:

- defaultSetDocument - Путь к документу, по умолчанию открываемый расширением. *default: \docs\README.md*

- changeSetDocumentOnShowDocumentCommand - Если вкл: запоминает открытый файл перед тем как переключиться на уже запомненный. *default: true*

## Known problems

- Файл по умолчанию присваивается не сразу.

## Release Notes

### 0.0.1

Реализован базовый функционал расширения.

### 0.1.0

От расширения есть смысл!
