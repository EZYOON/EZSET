import Router from 'express'
import { asyncRoute, validateParams } from '../../utils/api'
import OfficialAbsence from '../../models/officialAbsenceReason'
import { perm } from '../../utils/role'
import { getRealname } from '../../utils/user'
import { param, body } from 'express-validator'
const router = Router()
var moment = require('moment')

//사용자가 결석예약 날짜들을 선택하면 프론트에서 list 형태로 back에 전달, db에 해당 정보를 날짜별로 각각 저장
//body : dayList(Array), Reason(String)
//AttendanceManageMonthUser페이지에서 사용
router.post(
    '/absenceBook',
    [
        perm('absence').can('update'),
        body('dayList').isArray(),
        body('Reason').isString(),
        validateParams,
    ],
    asyncRoute(async function(req, res) {
        var Name = req.user.username
        var Reason = req.body.Reason
        var dayList = req.body.dayList
        var approval = false
        try {
            //백에서 list안의 원소를 각 날짜별로 결석 내용 저장 officialabsencereason
            for (var k in dayList) {
                var cursor = new OfficialAbsence()
                cursor.name = Name
                cursor.day = dayList[k]
                cursor.reason = Reason
                cursor.approval = approval
                cursor.save()
            }
            res.json(200)
        } catch (err) {
            res.status(501).json(err)
        }
    })
)

//officialAbsences Collection에서 자신(로그인한 사용자)의 공결 현황을 전부 가지고 옴
//AttendanceManagMonthUser 페이지에서 사용
router.get(
    '/absenceUserData',
    [perm('attendance').canOwn('read')],
    asyncRoute(async function(req, res) {
        try {
            const officialAbsence = await OfficialAbsence.find()
                .where('name')
                .equals(req.user.username)
            res.json(officialAbsence)
        } catch (err) {
            res.status(501).json()
        }
    })
)

//officialAbsences Collection에서 일 단위 공결 현황을 전부 가지고 옴
//param : day
//AttendanceManageDay 페이지에서 사용
router.get(
    '/absenceUsersData/:day',
    [perm('absence').canOwn('read'), param('day').isString(), validateParams],
    asyncRoute(async function(req, res) {
        try {
            const officialAbsence = await OfficialAbsence.find()
                .where('day')
                .equals(req.params.day)
            res.status(200).json(officialAbsence)
        } catch (err) {
            res.status(501).json()
        }
    })
)

//사용자의 공결 신청 내역 삭제
//body : reason(String), day(String)
//AttendanceManagMonth 페이지에서 사용
router.post(
    '/deleteAbsenceUser',
    [
        perm('absence').canOwn('delete'),
        body('reason').isString(),
        body('day').isString(),
        validateParams,
    ],
    asyncRoute(async function(req, res) {
        try {
            await OfficialAbsence.deleteOne({
                name: req.user.username,
                reason: req.body.reason,
                day: req.body.day,
            })
            res.status(200).json()
        } catch (err) {
            res.status(501).json()
        }
    })
)

//오늘날짜 이후의 공결신청 리스트 반환
//OfficialAbsenceAccept 페이지에서 사용
router.get(
    '/officialAbsenceList',
    [perm('absence').can('update'), validateParams],
    asyncRoute(async function(req, res) {
        try {
            const cursor_No = await OfficialAbsence.find({
                day: { $gte: moment().format('YYYY-MM-DD') },
                approval: false,
            }).sort({ name: 1 })
            const cursor_Yes = await OfficialAbsence.find({
                day: { $gte: moment().format('YYYY-MM-DD') },
                approval: true,
            }).sort({ name: 1 })

            const convertAb = async curlist => {
                const newlist = []
                for (let cur of curlist) {
                    newlist.push({
                        name: cur.name,
                        realname: await getRealname(cur.name),
                        day: cur.day,
                        reason: cur.reason,
                        approval: cur.approval,
                    })
                }
                return newlist
            }

            res.json({
                noanswer: await convertAb(cursor_No),
                yesanswer: await convertAb(cursor_Yes),
            })
        } catch (err) {
            res.status(501).json()
        }
    })
)

//공결 승인,취소 내역 저장
//body : name(String), day(String), approval(Boolean)
//OfficialAbsenceAccept 페이지에서 사용
router.post(
    '/officialAbsenceAccept',
    [
        perm('absence').can('update'),
        body('name').isString(),
        body('day').isString(),
        body('approval').isBoolean(),
        validateParams,
    ],
    asyncRoute(async function(req, res) {
        try {
            const cursor = await OfficialAbsence.findOneAndUpdate(
                {
                    name: req.body.name,
                    day: req.body.day,
                },
                { approval: req.body.approval },
                function(err, doc) {}
            )
            res.json(cursor)
        } catch (err) {
            res.status(501).json()
        }
    })
)

export default router
