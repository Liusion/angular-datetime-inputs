"use strict";angular.module("g1b.datetime-input",[]).directive("datetimeInput",["$document",function(e){return{restrict:"E",scope:{datetime:"=",handler:"&"},replace:!0,template:"<div class=datetime-input><div class=datetime ng-click=selectDate(datetime) ng-class=\"{'active': !!selected }\"><div class=date>{{ datetime.format('DD MMMM YYYY') }}</div><div class=time>{{ datetime.format('HH : mm : ss') }}</div></div><div class=edit-popover ng-show=!!selected><div class=calendar-toggle ng-click=\"calendar_active = !calendar_active\">{{ selected.format('DD MMMM YYYY') }}</div><div class=calendar ng-show=!!calendar_active><div class=calendar-header><div class=\"arrow arrow-left\" ng-click=\"calendar.subtract(1, 'months')\"></div>{{ calendar.format('MMMM') }}<div class=\"arrow arrow-right\" ng-click=\"calendar.add(1, 'months')\"></div></div><div class=calendar-body><div class=weekdays><span class=weekday ng-repeat=\"weekday in 'weeeeek' track by $index\">{{ calendar.clone().startOf('week').add($index, 'days').format('ddd') }}</span></div><div class=week ng-repeat=\"week in 'months' | limitTo: ((calendar.clone().endOf('month').week() - calendar.clone().startOf('month').week()) + 1) track by $index\"><span class=date ng-repeat=\"date in 'weeeeek' track by $index\" ng-class=\"{ 'current': calendar.clone().startOf('month').add($parent.$index, 'weeks').weekday($index).startOf('day').isSame(current.clone().startOf('day')), 'active': calendar.clone().startOf('month').add($parent.$index, 'weeks').weekday($index).startOf('day').isSame(selected.clone().startOf('day')), 'inactive': calendar.clone().startOf('month').add($parent.$index, 'weeks').weekday($index).month() !== calendar.month() }\" ng-click=\"setDate(selected.clone().month(calendar.clone().startOf('month').add($parent.$index, 'weeks').weekday($index).month()).date(calendar.clone().startOf('month').add($parent.$index, 'weeks').weekday($index).date()), true)\">{{ calendar.clone().startOf('month').add($parent.$index, 'weeks').weekday($index).date() }}</span></div></div></div><div class=timer><div class=timer-hours><div class=\"arrow arrow-up\" ng-click=\"setDate(selected.clone().add(1, 'hours'))\"></div>{{ selected.format('HH') }}<div class=\"arrow arrow-down\" ng-click=\"setDate(selected.clone().subtract(1, 'hours'))\"></div></div><div class=timer-divider>:</div><div class=timer-minutes><div class=\"arrow arrow-up\" ng-click=\"setDate(selected.clone().add(1, 'minutes'))\"></div>{{ selected.format('mm') }}<div class=\"arrow arrow-down\" ng-click=\"setDate(selected.clone().subtract(1, 'minutes'))\"></div></div><div class=timer-divider>:</div><div class=timer-seconds><div class=\"arrow arrow-up\" ng-click=\"setDate(selected.clone().add(1, 'seconds'))\"></div>{{ selected.format('ss') }}<div class=\"arrow arrow-down\" ng-click=\"setDate(selected.clone().subtract(1, 'seconds'))\"></div></div></div></div></div>",compile:function(){return{pre:function(){},post:function(a,t){a.current=moment(),a.selectDate=function(e){a.selected===e?a.selected=void 0:(a.selected=e,a.calendar=a.selected.clone())},a.setDate=function(e,t){a.selected.isSame(e)||(a.selected.year(e.year()).month(e.month()).date(e.date()).hours(e.hours()).minutes(e.minutes()).seconds(e.seconds()),(a.selected.clone().startOf("week").month()!==a.calendar.month()||t)&&(a.calendar=a.selected.clone()),a.handler())},a.start&&!a.start._isAMomentObject&&(a.start=moment(a.start)),a.end&&!a.end._isAMomentObject&&(a.end=moment(a.end)),e.on("mousedown",function(e){a.selected&&!t[0].contains(e.target)&&a.$apply(function(){a.selected="",a.calendar_active=!1})})}}}}}]);