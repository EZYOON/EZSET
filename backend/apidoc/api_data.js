define({ "api": [
  {
    "type": "get",
    "url": "/attendance/attendanceCheck/",
    "title": "출석유무 체크",
    "description": "<p>현재 날짜에 사용자의 출석 상태가 <code>attendance</code>상태인지 체크</p>",
    "name": "attendanceCheck",
    "group": "AttendanceCheck",
    "permission": [
      {
        "name": "can.att"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "1",
            "description": "<p>당일 사용자의 출석상태가 <code>출석</code> 상태임.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "0",
            "description": "<p>당일 사용자의 출석상태가 <code>출석</code> 상태가 아님.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     1\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/attendance.route.js",
    "groupTitle": "AttendanceCheck"
  },
  {
    "type": "get",
    "url": "/attendance/attendanceCheckAdmin/",
    "title": "서버 출석 코드 전송",
    "name": "attendanceCheckAdmin",
    "description": "<p>출석을 시작한 관리자가 출석 진행중에 페이지를 새로고침 했을 때 서버에서 생성한 출석 코드를 전송</p>",
    "group": "AttendanceCheck",
    "permission": [
      {
        "name": "can.att"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ranNum",
            "description": "<p>출석을 시작한 관리자의 요청일 경우</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "0",
            "description": "<p>출석을 시작한 관리자의 요청이 아닐 경우</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     129\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/attendance.route.js",
    "groupTitle": "AttendanceCheck"
  },
  {
    "type": "post",
    "url": "/attendance/attendanceCheckEnd/",
    "title": "출석 종료",
    "name": "attendanceCheckEnd",
    "description": "<p>출석 종료시 서버에서 생성했던 출석 코드(ranNum)와 출석시작했던 관리자 아이디(startUser) 값을 초기화</p>",
    "group": "AttendanceCheck",
    "permission": [
      {
        "name": "can.att"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "200",
            "description": "<p>정상 처리되었을 경우</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/attendance.route.js",
    "groupTitle": "AttendanceCheck"
  },
  {
    "type": "get",
    "url": "/attendance/attendanceDayList/",
    "title": "전체 일별 출결현황 반환",
    "description": "<p>전체 일별 출결현황 반환</p>",
    "name": "attendanceDayList",
    "group": "AttendanceCheck",
    "permission": [
      {
        "name": "can.read"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>전체 일별 출결현황 객체 배열</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n [\n {\n   \"_id\": \"5e1ff40db7ee260ffc203de5\",\n   \"status\": [\n     {\n       \"_id\": \"5e1ff40db7ee260ffc203de6\",\n       \"name\": \"admin\",\n       \"state\": \"late\"\n     },\n     {\n       \"_id\": \"5e1ff40db7ee260ffc203deb\",\n       \"name\": \"user0001\",\n       \"state\": \"attendance\"\n     },\n     {\n       \"_id\": \"5e1ff40db7ee260ffc203df0\",\n       \"name\": \"user0002\",\n       \"state\": \"attendance\"\n     }\n   ],\n   \"day\": \"20200115\",\n   \"__v\": 2\n },\n {\n   \"_id\": \"5e1ff480b7ee260ffc203df6\",\n   \"status\": [\n     {\n       \"_id\": \"5e1ff480b7ee260ffc203df7\",\n       \"name\": \"admin\",\n       \"state\": \"attendance\"\n     },\n     {\n       \"_id\": \"5e1ff480b7ee260ffc203dfb\",\n       \"name\": \"user0001\",\n       \"state\": \"official_absence\"\n     },\n     {\n       \"_id\": \"5e1ff480b7ee260ffc203dff\",\n       \"name\": \"user0002\",\n       \"state\": \"attendance\"\n     },\n     {\n       \"_id\": \"5e3bec45e9ce0e0968a5e781\",\n       \"name\": \"user0004\",\n       \"state\": \"absence\"\n     }\n   ],\n   \"day\": \"20200116\",\n   \"__v\": 3\n },\n]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/attendance.route.js",
    "groupTitle": "AttendanceCheck"
  },
  {
    "type": "get",
    "url": "/attendanceState/:day",
    "title": "일별 출석현황 반환",
    "description": "<p>특정 일자의 출석현황을 반환</p>",
    "name": "attendanceState",
    "group": "AttendanceCheck",
    "permission": [
      {
        "name": "can.update"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "day",
            "description": "<p>반환하고 싶은 날짜, YYYYMMDD 형태</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"day\":\"20200304\"\n}",
          "type": "get"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>해당 일자의 출결 정보 객체</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n         \"status\": [\n                     {\n                     \"_id\": \"5e5f4886c785712d2c55b022\",\n                      \"name\": \"admin\",\n                      \"state\": \"attendance\"\n                    },\n                     {\n                      \"_id\": \"5e5f4886c785712d2c55b026\",\n                      \"name\": \"user0001\",\n                      \"state\": \"attendance\"\n                    },\n                    {\n                      \"_id\": \"5e5f4886c785712d2c55b02a\",\n                      \"name\": \"user0002\",\n                      \"state\": \"attendance\"\n                    },\n                  ]\n      }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "404",
            "description": "<p>해당 일자에 출결정보 없음</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/attendance.route.js",
    "groupTitle": "AttendanceCheck"
  },
  {
    "type": "get",
    "url": "/attendance/attendanceUserList/",
    "title": "사용자 리스트 반환",
    "description": "<p>전체 사용자 리스트를 반환</p>",
    "name": "attendanceUserList",
    "group": "AttendanceCheck",
    "permission": [
      {
        "name": "can.update"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>전체 사용자정보 객체 배열</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n        [\n              {\n                 \"_id\": \"5e1ff2fc39c8d12194bd55f4\",\n                 \"username\": \"admin\"\n             },\n             {\n                \"_id\": \"5e1ff395b7ee260ffc203de2\",\n                \"username\": \"user0001\"\n             },\n             {\n                \"_id\": \"5e1ff3b3b7ee260ffc203de3\",\n                \"username\": \"user0002\"\n             },\n         ]\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/attendance.route.js",
    "groupTitle": "AttendanceCheck"
  },
  {
    "type": "get",
    "url": "/attendance/attendanceUserListData/",
    "title": "사용자별 출결현황 반환",
    "description": "<p>사용자별 출결현황 반환</p>",
    "name": "attendanceUserListData",
    "group": "AttendanceCheck",
    "permission": [
      {
        "name": "can.read"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>전체 사용자별 출결현황 객체 배열</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n {\n   \"_id\": \"5e1ff40db7ee260ffc203de8\",\n   \"status\": [\n     {\n       \"_id\": \"5e1ff40db7ee260ffc203de9\",\n       \"date\": \"20200115\",\n       \"state\": \"late\"\n     },\n     {\n       \"_id\": \"5e1ff480b7ee260ffc203df9\",\n       \"date\": \"20200116\",\n       \"state\": \"attendance\"\n     },\n   ],\n   \"name\": \"admin\",\n   \"__v\": 27\n },\n {\n   \"_id\": \"5e1ff40db7ee260ffc203ded\",\n   \"status\": [\n     {\n       \"_id\": \"5e1ff40db7ee260ffc203dee\",\n       \"date\": \"20200115\",\n       \"state\": \"attendance\"\n     },\n     {\n       \"_id\": \"5e1ff480b7ee260ffc203dfd\",\n       \"date\": \"20200116\",\n       \"state\": \"official_absence\"\n     },\n   ],\n   \"name\": \"user0001\",\n   \"__v\": 27\n },\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/attendance.route.js",
    "groupTitle": "AttendanceCheck"
  },
  {
    "type": "post",
    "url": "/attendance/attendanceWrite/",
    "title": "출석 요청",
    "description": "<p>사용자가 자신이 입력한 코드로 출석요청을 보냄. 서버에서 생성한 출석코드와 일치한다면 출석 처리</p>",
    "name": "attendanceWrite",
    "group": "AttendanceCheck",
    "permission": [
      {
        "name": "can.att"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>사용자가 입력한 출석번호</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"code\":129\n}",
          "type": "post"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "1",
            "description": "<p>서버가 생성한 번호와 사용자가 입력한 번호가 일치함.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "0",
            "description": "<p>서버가 생성한 번호와 사용자가 입력한 번호가 일치하지 않음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":1\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"result\":0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "404",
            "description": "<p>게시물 제목 에러</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"제목오류\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/attendance.route.js",
    "groupTitle": "AttendanceCheck"
  },
  {
    "type": "post",
    "url": "/attendancestateupdate/:day",
    "title": "출석 상태 업데이트",
    "description": "<p><code>day</code>날짜에 <code>name</code>이라는 아이디를 가진 사용자의 출석 상태를 <code>state</code>로 업데이트</p>",
    "name": "attendancestateupdate",
    "group": "AttendanceCheck",
    "permission": [
      {
        "name": "can.update"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "day",
            "description": "<p>업데이트할 날짜, YYYYMMDD 형태</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>업데이트할 상태 (<code>attendance</code>,<code>absence</code>,<code>late</code>,<code>offical_absence</code>)중 하나</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>업데이트할 사용자 아이디</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"day\":\"20200304\",\n    \"state\":\"late\",\n    \"name\":\"hschoi1104\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "object",
            "description": "<p>바꾼 상태의 객체 반환</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    체크해보기\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/attendance.route.js",
    "groupTitle": "AttendanceCheck"
  },
  {
    "type": "post",
    "url": "/attendance/startAttendance/",
    "title": "출석 시작",
    "name": "startAttendance",
    "description": "<p>출석시작버튼을 눌렀을경우 관리자는 출석상태로 다른 모든 유저는 결석상태로 업데이트함</p>",
    "group": "AttendanceCheck",
    "permission": [
      {
        "name": "can.update"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ranNum",
            "description": "<p>서버에서 생성한 3자리 출석코드 반환</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"code\": ranNum\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/attendance.route.js",
    "groupTitle": "AttendanceCheck"
  },
  {
    "type": "post",
    "url": "/auth/edittoken/check",
    "title": "유저 회원정보 보안 토큰 유효성 검사",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JWT",
            "optional": false,
            "field": "editToken",
            "description": "<p>회원정보 보안 토큰</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "200",
            "description": "<p>회원정보 보안 토큰이 유효함</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "403",
            "description": "<p>회원정보 보안 토큰이 유효하지 않음</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/auth.route.js",
    "groupTitle": "Auth",
    "name": "PostAuthEdittokenCheck"
  },
  {
    "type": "post",
    "url": "/auth/edittoken/issue",
    "title": "유저 회원정보 보안 토큰 발급",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>유저 아이디</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>유저 비밀번호</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JWT",
            "optional": false,
            "field": "editToken",
            "description": "<p>회원정보 보안 토큰</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "403",
            "description": "<p>회원정보 보안 토큰 발급 실패 에러</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403\n{\n   message: '토큰 발급 실패',\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/auth.route.js",
    "groupTitle": "Auth",
    "name": "PostAuthEdittokenIssue"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "유저 회원가입",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>유저 아이디</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>유저 비밀번호</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "realname",
            "description": "<p>유저 실명</p>"
          },
          {
            "group": "Parameter",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": "<p>유저 이메일</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/auth.route.js",
    "groupTitle": "Auth",
    "name": "PostAuthRegister"
  },
  {
    "type": "post",
    "url": "/auth/register/doublecheck/username",
    "title": "유저 중복 아이디 체크",
    "group": "Auth",
    "description": "<p>유저가 화원가입 할 시 username을 중복 체크</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>유저 아이디</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "200",
            "description": "<p>사용할 수 있는 아이디</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "409",
            "description": "<p>username 중복 에러</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409\n{\n   message: '이미 사용중인 아이디입니다.',\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/auth.route.js",
    "groupTitle": "Auth",
    "name": "PostAuthRegisterDoublecheckUsername"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "로그인",
    "name": "로그인",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>로그인 할 아이디</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>로그인 할 비밀번호</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JWT",
            "optional": false,
            "field": "accessToken",
            "description": "<p>로그인 인증 토큰</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"accessToken\": \"<JWT-LOGIN-TOKEN>\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/auth.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/simple/boards/",
    "title": "게시판 목록",
    "description": "<p>게시판 목록을 불러온다</p>",
    "name": "게시판_목록",
    "group": "Board",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "200",
            "description": "<p>게시판 목록</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200\n{\n    \"_id\": 10,\n    \"title\": \"test\"\n},\n{\n    \"_id\": 11,\n    \"title\": \"익명게시판\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "404",
            "description": "<p>해당 게시판 없음</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404\n{\n   message: '존재하지 않는 게시판입니다.',\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/simple.route.js",
    "groupTitle": "Board"
  },
  {
    "type": "delete",
    "url": "/simple/boards/:board_id",
    "title": "게시판 삭제",
    "description": "<p>게시판을 삭제한다</p>",
    "name": "게시판_삭제",
    "group": "Board",
    "permission": [
      {
        "name": "can.delete"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "board_id",
            "description": "<p>게시판 아이디</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "200",
            "description": "<p>게시판 삭제</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n   message: '게시판을 삭제했습니다',\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "404",
            "description": "<p>해당 게시판 없음</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "500",
            "description": "<p>게시판 삭제 에러</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404\n{\n   message: '존재하지 않는 게시판입니다.',\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/v1/simple.route.js",
    "groupTitle": "Board"
  },
  {
    "type": "post",
    "url": "/simple/boards/",
    "title": "게시판 생성",
    "description": "<p>새로운 게시판을 생성한다</p>",
    "name": "게시판_생성",
    "group": "Board",
    "permission": [
      {
        "name": "can.create"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>게시판 이름</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>익명게시판 판단</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "201",
            "description": "<p>게시판 생성 성공</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "500",
            "description": "<p>게시판 생성 에러</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/simple.route.js",
    "groupTitle": "Board"
  }
] });