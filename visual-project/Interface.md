# 接口

## 登录

1.登录

```json
path = "/login"
data = {
    "username": "string",
    "password": "string"
}
```

## 案件列表
```json
baseUrl = "/list"
```

1.得到所有案件

```json
path = "/getAll"
data = {
    "username": "username"
}
```

2.得到已完成案件

```json
path = "/getFinishedCases"
data = {
    "username": "username"
}
```

3.得到正在处理的案件

```json
path = "/getProcessingCases"
data = {
    "username": "username"
}
```

4.搜索

```json
path = "/search"
data = {
    "username": "casename",
    "casename": "casename"
}
```

## 证据分解
```json
baseUrl = "/cases"
```

1.分解证据

```json
path = "/document"
data = {
    "caseId": 0,
    "type": 0,
    "text": "string"
}
getData = [
    {
        "documentId": 0,
        "type": 0,
        "body": "string",
        "agree": 0
    },
    ...
]
```

2.提取链头

```json
path = "/createHead"
data = {
    "documentId": 0
}
```

3.新增单条证据document

```json
path = "/addBody"
data = {
    "caseId": 0,
    "type": 0,
    "body": "string",
    "documentId": 0
}
```

4.新增链头

```json
path = "/addHead"
data = {
    "caseId": 0,
    "head": "string",
    "documentId": 0,
    "bodyId": 0
}
```

5.更新整段证据

```json
path = "/updateBodyById"
data = {
    "bodyId": 0,
    "body": "string"
}
```

6.更换证据类型

```json
path = "/updateTypeById"
data = {
    "documentId": 0,
    "type": 0
}
```

## 质证与采信

## 事实认定

## 证据链建模

## 说理逻辑
