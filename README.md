# Template API Express

## Requirements
- Docker
## Start Up
```
$ docker-compose up -d --build
$ docker exec cloud-wiki-api_app_1 npx sequelize db:create    # 【初回のみ】
$ docker exec cloud-wiki-api_app_1 npx sequelize db:migrate   # 【初回のみ】
$ docker exec cloud-wiki-api_app_1 npx sequelize db:seed:all  # 【初回のみ】
```
## Shut Down
```
$ docker-compose down
```
## 【Develop】Access Point
- Cloud Wiki API .. http://localhost:3000
- MySQL          .. Port 3306
- Redis          .. Port 6379
- phpmyadmin     .. http://localhost:8888
## 【Develop】DB設計
### テーブル
- 末尾は **s** を付ける。
- **1:n** のテーブルは、**単数形_複数形** にする。
- **n:n** のテーブルは、**複数形_複数形** にする。
### カラム
- 基本は **テーブル名_XXX** とする。

## 【Production】Access Point
- Cloud Wiki API .. https://api.cloud-wiki.wiki
- MySQL          .. AWS RDS
- Redis          .. AWS ElastiCache

## ディレクトリ構成
```
├── __tests__           .. 
├── bin                 .. 
├── config              .. 
├── controllers         .. 
├── mails               .. 
├── migrations          .. 
├── models              .. 
├── node_modules        .. 
├── public              .. 
├── routes              .. 
├── seeders             .. 
├── uploads             .. 
├── utils               .. 
├── .gitattributes      .. 
├── .gitignore          .. 
├── app.js              .. 
├── docker-compose.yml  .. 
├── Dockerfile          .. 
├── jest.config.js      .. 
├── package-lock.json   .. 
├── package.json        .. 
├── README.md           .. 
└── swagger.json        .. 
```
# Another Info
### sequelize
```
### pwd：ルートディレクトリ
## sequelize
# DB作成
$ docker exec agileboostapi_app_1 sequelize db:create
# DB削除
$ docker exec agileboostapi_app_1 sequelize db:drop
# migrate実行
$ docker exec agileboostapi_app_1 sequelize db:migrate
# 実行済みmigrateを全て取り消し
$ docker exec agileboostapi_app_1 sequelize db:migrate:undo:all
# 設定されていたseedファイルをmigrate
$ docker exec agileboostapi_app_1 sequelize db:seed:all
# seedファイルのmigrateを全て取り消し
$ docker exec agileboostapi_app_1 seqeulize db:seed:undo:all
# テーブル定義作成
$ docker exec agileboostapi_app_1 sequelize model:generate --name [table] --attributes [column]:[型],[column]:[型]
ex) sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```

# リファレンス
- express
  - 公式：https://expressjs.com/
- passport
  - 公式：http://www.passportjs.org/
- sequelize
  - 使い方：https://blog.capilano-fw.com/?p=5582
- Nodemailer
  - 公式：https://nodemailer.com/about/
- Swagger
  - 使い方：https://techblog.zozo.com/entry/swagger_yaml