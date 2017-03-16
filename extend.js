/**
 * JS基础对象扩展
 * 扩展JS的基础对象，增加一些便捷的方法
 * by 赵宇飞	2017-03-16 11:31:46
 */
(function(){
	var Extend = function(){

		/**
		 * Date对象扩展————start
		 */

		/**
		 * 返回已添加指定时间间隔的日期对象。
		 * dateObj.dateAdd(interval, number)
		 * 参数
		 * dateObj必选项。任意 Date 对象。
		 * interval必选项。字符串表达式，表示要添加的时间间隔。有关数值，请参阅“设置”部分。
		 * number必选项。数值表达式，表示要添加的时间间隔的个数。数值表达式可以是正数（得到未来的日期）或负数（得到过去的日期）。
		 * interval 参数可以有以下值：
		 * y	年
		 * q	季度
		 * m	月
		 * d	日
		 * w	周
		 * h	小时
		 * n	分钟
		 * s	秒
		 * ms	毫秒
		 */
		Date.prototype.DateAdd = function(strInterval, Number) {  
			var dtTmp = this; 
			switch (strInterval) {  
				case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number)); 
				case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number)); 
				case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number)); 
				case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number)); 
				case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number)); 
				case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
				case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
				case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
			} 
		};

		/**
		 * 时间差计算
		 * 返回两个日期对象之间的时间间隔。
		 * dateObj.dateDiff(interval, dateObj2)
		 * 参数
		 * interval必选项。字符串表达式，表示用于计算 date1 和 date2 之间的时间间隔。有关数值，请参阅“设置”部分。
		 * dateObj, dateObj2必选项。日期对象。用于计算的两个日期对象。
		 */
		Date.prototype.DateDiff = function(strInterval, dtEnd) {  
			var dtStart = this; 
			if (typeof dtEnd == 'string' )//如果是字符串转换为日期型 
			{  
				dtEnd = StringToDate(dtEnd); 
			} 
			switch (strInterval) {  
				case 's' :return parseInt((dtEnd - dtStart) / 1000); 
				case 'n' :return parseInt((dtEnd - dtStart) / 60000); 
				case 'h' :return parseInt((dtEnd - dtStart) / 3600000); 
				case 'd' :return parseInt((dtEnd - dtStart) / 86400000); 
				case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7)); 
				case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1); 
				case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear(); 
			} 
		};

		/**
		 * 格式化时间，返回想要的格式
		 * @formatModel: 想要的格式模板
		 * 返回值：对应形式的时间字符串
		 * 例如： new Date().Dateformat("yyyy年mm月dd日hh:nn:ss 星期ww")，返回 2017年3月16日11:40:31 星期四
		 */
		Date.prototype.Dateformat = function(formatModel){
			var d = this;
				var yyyy = d.getFullYear(),
					mm = d.getMonth() + 1,
					dd = d.getDate(),
					hh = d.getHours(),
					nn = d.getMinutes(),
					ss = d.getSeconds(),
					YY = ("" + yyyy).right(2),
					MM = ("00" + mm).right(2),
					DD = ("00" + dd).right(2),
					HH = ("00" + hh).right(2),
					NN = ("00" + nn).right(2),
					SS = ("00" + ss).right(2),
					ww = d.getDay(),
					a = new Array("日", "一", "二", "三", "四", "五", "六"),
					ww = a[ww];
				return formatModel
						.replace(/yyyy/g, yyyy)
						.replace(/mm/g, mm)
						.replace(/dd/g, dd)
						.replace(/hh/g, hh)
						.replace(/nn/g, nn)
						.replace(/ss/g, ss)
						.replace(/YY/g, YY)
						.replace(/MM/g, MM)
						.replace(/DD/g, DD)
						.replace(/HH/g, HH)
						.replace(/NN/g, NN)
						.replace(/SS/g, SS)
						.replace(/ww/g, ww);
		};

		/**
		 * 获取当月第一天
		 * ios存在bug，不支持new Date("yyyy-mm-dd hh:nn:ss")的写法，因而使用new Date(yyyy,mm,dd,hh,nn,ss)的写法
		 */
		Date.prototype.FirstDay = function(){
			var date_ = this;
			var year = date_.getFullYear();
			var month = date_.getMonth();
			var month_first = new Date(year, month, 1, 0, 0, 0);
			return month_first;
		};

		/**
		 * 获取当月最后一天
		 */
		Date.prototype.LastDay = function(){
			var date_ = this;
			var year = date_.getFullYear();
			var month = date_.getMonth();
			var day = new Date(year,month + 1,0).getDate();
			var month_last = new Date(year, month, day, 23, 59, 59);
			return month_last;
		};

		/**
		 * Date对象扩展————end
		 */

		/**
		 * String对象扩展————start
		 */
		/**
		 * 字符串截取函数，从左（右）开始截取定长字符串
		 */
		String.prototype.left = function(len){
			if(len > 0){
				return this.substring(0, len);
			}else{
				return null;
			}
		};

		String.prototype.right = function(len){
			if (this.length >= len && this.length >= 0 && this.length - len <= this.length){
				return this.substring(this.length - len, this.length);
			}else{
				return null;
			}
		};

		/**
		 * 字符串包含判断，返回是否包含子字符串
		 */
		String.prototype.has = function(str){
			return (this.indexOf(str) >= 0);
		};

		/**
		 * 格式化时间字符串，返回时间对象
		 * 将“yyyy-mm-dd hh:nn:ss”形式的字符串，转换为时间对象。
		 * 原因：ios系统不支持，new Date(“yyyy-mm-dd hh:nn:ss”)的形式
		 */
		String.prototype.toDate = function(){
			var self = this,
				arr = self.split(/[- :]/g),
				len = arr.length;
			for(var i = 0, len = 6; i < len; i++){
				if(!arr[i]){arr[i] = 0}
			}
			var D = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
			return D;
		};

		/**
		 * 格式化时间字符串，返回想要的格式
		 * @formatModel: 想要的格式模板
		 *  将“yyyy-mm-dd hh:nn:ss”形式的字符串，转换为想要的时间形式。
		 */
		String.prototype.Dateformat = function(formatModel){
			var self = this;
			var D = self.toDate();
			if(D instanceof Date){
				return D.Dateformat(formatModel);
			}else{
				return self;
			}
		};
		/**
		 * String对象扩展————end
		 */

		return {};

	};

	var extend = Extend();

	if (typeof exports == "object") {//--支持 CommonJS
		module.exports = extend;
	} else if (typeof define == "function" && define.amd) {//--支持 AMD
		define([], function(){ return extend });
	} else {//--其它情况直接挂到window上
		window.extend = extend;
	}
})();