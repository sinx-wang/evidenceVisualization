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
baseUrl = "/case"
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
param = {
    "username": "username"
}
return = [
  {
    "cid": 0,
    "cname": "string",
    "type": "string",
    "fillingDate": "string",
    "manageJudge": "string"
  }
]
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
baseUrl = "/evidence"
```
0. 得到案件的基本信息 （案号 案件名称 承办人）

```json
path = "/getCaseDetail"
param = {
     "username" : 'xxx',
     "caseId": 1
}
return = {
    caseNum: "(2015)浦刑",
    caseName: "string"
}
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
        "documentId": 0,//这是要分解id
        "bodyId": 0,//这是单个证据的id
        "type": 0,
        "body": "string",
        "confirm": 0
    },
    ...
]
```

2.提取链头

```json
path = "/createHead"
param = {
    "documentId": 0
}
return = [
    {
        "bodyId": 0,
        "headList": [
            {
                "headId": 0,
                "head": "string"
            },...
         ]
    }
    ...
]

path = "/createHeadByBodyId"
param = {
    "documentId": 0,
    "bodyId": 0
}
return = [
    {
        "headId": 0,
        "head": "string"
    },...
]
```

3.新增删除单条证据

```json
path = "/addBody"
param = {
    "caseId": 0,
    "type": 0,
    "body": "string",
    "documentId": 0
}
return = {
     “bodyId": 0
}

path = "/deleteBody"
param = {
    "caseId": 0,
    "bodyId": 0
}
return = {
    "success": true
}
```

4.新增链头

```json
path = "/addHead"
param = {
    "caseId": 0,
    "head": "string",
    "documentId": 0,
    "bodyId": 0
}
return = {
    "headId": 0
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
    "bodyId": 0,
    "type": 0
}
```

7. 获取非矛盾证据

```json
path = "/getNoContradictByDocumentId"
param = {
    "documentId": 0
}
return = [
    {
        "role": 0,
        "bodys": [
            {
                "bodyId": 0,
                "type": 0,
                "body": "string",
                "confirm": 0
            },
            ...
        ]
    },...
]
```

8. 获取矛盾证据

```json
path = "/getContradictByDocumentId"
param = {
    "documentId": 0
}
return = [
    {
        "contradictId": 0,
        "bodys": [
            {
                "bodyId": 0,
                "type": 0,
                "body": "string",
                "confirm": 0,
                "role": 0
            }
        ]
    },...
]
```

9. 认定证据
```json
path = "/updateTrustById"
data = {
    "bodyId": 0,
    "confirm": 0
}
```

## 事实认定
```json
baseUrl = "/facts"
```

1.分解事实
```json
path = "/resolve"
param = {
    "caseId": 0,
    "text": "string"
}
return = [
    {
        "factId": 0,
        "body": "string",
        "confirm": 0
    },
    ...
]
```

2.提取联结点

```json
path = "/createJoint"
param = {
    "caseId": 0
}
return = [
    {
        "factId": 0,
        "jointList": [
            "jointId": 0,
            "content": "string"
            ],
            ...
    }
    ...
]
```

3.新增单条事实

```json
path = "/addFact"
param = {
    "caseId": 0,
    "body": "string"
}
return = {
    "factId": 0
}
```

4.新增联结点

```json
path = "/addJoint"
param = {
    "caseId": 0,
    "joint": "string",
    "factId": 0
    "bodyId": 0
}
return = {
    "jointId": 0
}
```

5.更新整段事实

```json
path = "/updateFactById"
param = {
    "bodyId": 0,
    "body": "string"
}
```

6. 认定事实
```json
path = "/updateTrustById"
data = {
    "factId": 0,
    "confirm": 0
}
```

7. 获取待认定事实

```json
path = "/getToConfirmByCaseId"
param = {
    "caseId": 0
}
return = [
    {
         "factId": 0,
         "body": "string",
         "confirm": 0
     },
]
```

## 证据链建模
```json
baseUrl = "/model"
```

1.

## 说理逻辑
