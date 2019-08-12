(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},20:function(e,t,n){e.exports=n(32)},25:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(15),s=n.n(r),i=(n(14),n(2)),u=n(3),c=n(6),l=n(5),m=n(7),h=(n(25),n(19)),d=n(18),p=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".";Object(i.a)(this,e),this.decimalSeparator=t,this.inputDigits=""}return Object(u.a)(e,[{key:"formatted",value:function(){var e=this.formattedCents(),t=e.substring(e.length-2,e.length),n=e.substring(0,e.length-2);return"".concat(n).concat(this.decimalSeparator).concat(t)}},{key:"formattedCents",value:function(){var e=4-this.inputDigits.length;return e>0?Object(d.a)(Array(e).keys()).reduce(function(e){return"0"+e},"")+this.inputDigits:this.inputDigits}},{key:"valueCents",value:function(){return parseInt(this.formattedCents(),10)}},{key:"keyDown",value:function(e){this.inputDigits=this.inputDigits+e}},{key:"backspace",value:function(){this.inputDigits=this.inputDigits.substring(0,this.inputDigits.length-1)}},{key:"clear",value:function(){this.inputDigits=""}}],[{key:"fromCents",value:function(t){for(var n=new e(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"."),a=t.toString(),o=0;o<a.length;o++)n.keyDown(a.charAt(o));return 0===t&&n.clear(),n}}]),e}(),f=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).amountFormatter=p.fromCents(n.props.initialValue),n._amount=null,n.state={value:n.props.initialValue,formattedValue:n.amountFormatter.formatted()},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"amountChanged",value:function(e){var t=e.key;e.preventDefault();var n=t.charCodeAt(0);if("Tab"!==t){e.preventDefault();var a="Backspace"===t,o=n>="0".charCodeAt(0)&&n<="9".charCodeAt(0);a?this.amountFormatter.backspace():o&&(this.amountFormatter.keyDown(String.fromCharCode(n)),this.props.onDigit(t)),this.props.onAmountChanged(this.amountFormatter.valueCents()),this.setState({value:this.amountFormatter.valueCents(),formattedValue:this.amountFormatter.formatted()})}}},{key:"clear",value:function(){this.amountFormatter.clear(),this.setState({value:this.amountFormatter.valueCents(),formattedValue:this.amountFormatter.formatted()})}},{key:"render",value:function(){var e=this;return o.a.createElement("input",{type:"number",className:this.props.inputClass,name:"amount",onChange:function(){},onKeyDown:this.amountChanged.bind(this),ref:function(t){e._amount=t},value:this.state.formattedValue})}}]),t}(a.Component);f.defaultProps={onDigit:function(){return console.warn("Unhadled onDigit")},onAmountChanged:function(){},className:"input-group-field amount-input",initialValue:0};var y=f,g=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={},n._validationMessages={},n.amountFormatter=new p,n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"amountChanged",value:function(e){var t=e.key,n=t.charCodeAt(0);if("Tab"!==t){e.preventDefault();var a="Backspace"===t,o=n>="0".charCodeAt(0)&&n<="9".charCodeAt(0);a?this.amountFormatter.backspace():o&&(this.amountFormatter.keyDown(String.fromCharCode(n)),this._validationMessages.amount.empty.className="form-error"),this._amount.value=this.amountFormatter.formatted(),this.setState({amount:this.amountFormatter.valueCents()})}}},{key:"clearErrors",value:function(){this._validationMessages.amount.empty.className="form-error"}},{key:"categorySelected",value:function(e){var t=e.target.value,n=this.props.categories.filter(function(e){return e.id===parseInt(t,10)})[0];this._validationMessages.category.empty.className="form-error",this.setState({category:n})}},{key:"formSubmitted",value:function(){var e=this,t=this.props.onSubmit;return function(n){var a=e.state,o=a.category,r=e._amount.state.value,s=[];if(o||(s.push({where:"category",type:"empty_field"}),e._validationMessages.category.empty.className="form-error is-visible"),r||(s.push({where:"amount",type:"empty_field"}),e._validationMessages.amount.empty.className="form-error is-visible"),0!==s.length)return n.preventDefault(),void e.props.onValidationError(s);e.setState({amount:null,category:null}),e.amountFormatter.clear(),e._amount.value=e.amountFormatter.formatted(),e._category.value=null,e._comment.value=null,e._amount.clear(),t(n,Object(h.a)({},a,{amount:r}))}}},{key:"render",value:function(){var e=this,t=this.props.categories.map(function(e,t){return o.a.createElement("option",{key:t,value:e.id},e.name)});return o.a.createElement("form",{className:"expense-form"},o.a.createElement("label",null,o.a.createElement("div",null,"Amount",o.a.createElement("div",{className:"input-group"},o.a.createElement("span",{className:"input-group-label"},"\u20ac"),o.a.createElement(y,{ref:function(t){return e._amount=t},onDigit:this.clearErrors.bind(this),inputClass:"input-group-field amount-input"})),o.a.createElement("div",{className:"form-error-container"},o.a.createElement("span",{ref:function(t){return e._validationMessages.amount={empty:t}},className:"form-error"},"Amount cannot be empty")))),o.a.createElement("label",null,o.a.createElement("div",null,"Category",o.a.createElement("select",{defaultValue:0,className:"expense-form-category",name:"category",onChange:this.categorySelected.bind(this),ref:function(t){return e._category=t}},o.a.createElement("option",{value:0}),t),o.a.createElement("div",{className:"form-error-container"},o.a.createElement("span",{ref:function(t){return e._validationMessages.category={empty:t}},className:"form-error"},"Category cannot be empty")))),o.a.createElement("label",null,o.a.createElement("div",null,"Comment",o.a.createElement("input",{ref:function(t){return e._comment=t},type:"text",className:"expense-form-category",name:"category",onChange:function(t){return e.setState({comment:t.target.value})}}))),o.a.createElement("input",{type:"submit",className:"expense-form-submit success button expanded large",value:"Add expense",onSubmit:this.formSubmitted().bind(this),onClick:this.formSubmitted().bind(this),ref:function(t){return e._submit=t}}))}}]),t}(a.Component);g.defaultProps={onSubmit:function(e,t){return console.warn("Unhadled onSubmit")},onValidationError:function(){return console.warn("Unhadled validation error")},categories:[]};var v=g,b=n(11),k=n(8),E=n.n(k),C=1.1.toLocaleString().substring(1,2),O=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){return E()()};Object(i.a)(this,e);var a=t.id,o=t.amountCents,r=t.categoryId,s=t.comment,u=t.deleted;this.id=a,this.amountCents=o,this.categoryId=r,this.comment=s;var c=n();this.deleted=u||!1,this.date={day:c.date(),month:c.month()+1,year:c.year(),hour:c.hour(),minute:c.minute()}}return Object(u.a)(e,[{key:"amountAsString",value:function(){var e=this.amountCents%10,t=this.amountCents/10;return"".concat(t).concat(C).concat(e)}},{key:"sameMonth",value:function(e){return this.getDateMoment().format("YYYY_MM")===e.yearMonth}},{key:"formattedDate",value:function(){return this.date?this.getDateMoment().format("DD-MM-YYYY HH:mm"):"-"}},{key:"getDateMoment",value:function(){var e="".concat(this.date.day,"-").concat(this.date.month,"-").concat(this.date.year," ").concat(this.date.hour,":").concat(this.date.minute);return E()(e,"DD-MM-YYYY HH:mm")}}],[{key:"createFromState",value:function(t,n){var a=n.category.id;return new e({id:t,amountCents:n.amount,categoryId:a,comment:n.comment})}},{key:"fromJsonObj",value:function(t){var n=new e({id:t.id,amountCents:t.amountCents,categoryId:t.categoryId,comment:t.comment,deleted:t.deleted});return n.date=t.date,n.date&&(n.date.hour=t.date.hour||12,n.date.minute=t.date.minute||0),n}}]),e}(),S=n(16),M=n.n(S),j=function(){function e(){Object(i.a)(this,e)}return Object(u.a)(e,[{key:"next",value:function(){return M()()}}]),e}();function x(){return E()()}var _=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:x;Object(i.a)(this,e),this._dateProvider=a,this.amount=t,this.projected=this._calculateProjection(),this.spentPreviousMonth=n,this.rate=this._calculateSpentRateVsPreviousMonth()}return Object(u.a)(e,[{key:"_calculateProjection",value:function(){var e=this._dateProvider().date(),t=this._dateProvider().endOf("month").date();return Math.round(t*this.amount/e)}},{key:"_calculateSpentRateVsPreviousMonth",value:function(){if(this.amount&&this.spentPreviousMonth)return Math.round(this.amount/this.spentPreviousMonth*100)}}]),e}(),w=function(){function e(t){Object(i.a)(this,e),this.localStorage=t}return Object(u.a)(e,[{key:"list",value:function(){return this.listAll().filter(function(e){return!0!==e.deleted})}},{key:"listAll",value:function(){return this._getExpenseKeys().map(this.localStorage.getItem.bind(this.localStorage)).map(JSON.parse).map(O.fromJsonObj).sort(function(e,t){return-e.getDateMoment().diff(t.getDateMoment(),"minutes")})}},{key:"_getExpenseKeys",value:function(){var e=this.localStorage.getItem("nummus.io.expenseKeys")||"[]";return JSON.parse(e)}},{key:"add",value:function(e){var t="".concat("nummus.io",".expenses.").concat(e.id),n=this._getExpenseKeys();this.localStorage.setItem(t,JSON.stringify(e)),n.push(t),this.localStorage.setItem("nummus.io.expenseKeys",JSON.stringify(n))}},{key:"delete",value:function(e){var t="".concat("nummus.io",".expenses.").concat(e.id);e.deleted=!0,this.localStorage.setItem(t,JSON.stringify(e))}},{key:"hardDelete",value:function(e){var t="".concat("nummus.io",".expenses.").concat(e.id),n=this._getExpenseKeys();this.localStorage.removeItem(t),n=n.filter(function(e){return e!==t}),this.localStorage.setItem("nummus.io.expenseKeys",JSON.stringify(n))}},{key:"amountsByCategory",value:function(e){var t=this._amountsByCategory(e.previousMonth());return new Map(Array.from(this._amountsByCategory(e)).map(function(e){var n=Object(b.a)(e,2),a=n[0],o=n[1];return[a,new _(o,t.get(a))]}))}},{key:"_amountsByCategory",value:function(e){return this.list().filter(function(t){return t.sameMonth(e)}).reduce(function(e,t){var n=e.get(t.categoryId)?e.get(t.categoryId):0;return e.set(t.categoryId,n+t.amountCents),e},new Map)}},{key:"dump",value:function(){return JSON.stringify(this.listAll())}},{key:"loadDump",value:function(e){this.list().forEach(this.hardDelete.bind(this)),JSON.parse(e).map(O.fromJsonObj).forEach(this.add.bind(this))}},{key:"findBy",value:function(e){var t=e.toMoment();return this.list().filter(function(e){var n=e.getDateMoment();return n.month()===t.month()&&n.year()===t.year()})}},{key:"userUuid",value:function(){var e="nummus.io.userUuid",t=this.localStorage.getItem(e)||(new j).next();return this.localStorage.setItem(e,t),t}},{key:"setUserUuid",value:function(e){this.localStorage.setItem("nummus.io.userUuid",e)}},{key:"apiKey",value:function(){return this.localStorage.getItem("nummus.io.apiKey")}},{key:"saveApiKey",value:function(e){this.localStorage.setItem("nummus.io.apiKey",e)}},{key:"shouldSync",value:function(e){var t=this.localStorage.getItem("nummus.io.lastSync");return!t||E()(t,"YYYYMMDDHH").add(1,"day").diff(E()(),"hours")<0}},{key:"synced",value:function(){this.localStorage.setItem("nummus.io.lastSync",E()().format("YYYYMMDDHH"))}}]),e}(),N=function e(t,n,a){Object(i.a)(this,e),this.id=t,this.categoryBudgets=n,this.month=a},D=1.1.toLocaleString().substring(1,2),Y=function(){function e(t,n,a){Object(i.a)(this,e),this.id=t,this.budgeted=n,this.categoryId=a}return Object(u.a)(e,[{key:"setBudget",value:function(e){this.budgeted=e}},{key:"formatedBudgetedAmount",value:function(){var e=this.budgeted%100,t=Math.floor(this.budgeted/100);return"".concat(t).concat(D).concat(e)}}],[{key:"fromCategory",value:function(t){return function(n){return new e("".concat(n.id,"_").concat(t),0,n.id)}}}]),e}(),R=function(){function e(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:A;Object(i.a)(this,e),this._localStorage=t,this._categoryRepository=n,this._dateProvider=a,this._initializeBudgets()}return Object(u.a)(e,[{key:"list",value:function(){return this.categories}},{key:"_now",value:function(){return this._dateProvider()}},{key:"currentMonthlyBudget",value:function(){var e=this._now().format("YYYY_MM");return this._findOrCreate(e)}},{key:"findMonth",value:function(e){return this.listMonths().filter(function(t){return t.yearMonth===e})[0]}},{key:"_findOrCreate",value:function(e){var t="".concat("nummus.io",".monthlyBudgets.").concat(e),n=this._localStorage.getItem(t);if(n){var a=this._parseObject(n);return a.categoryBudgets=a.categoryBudgets.map(function(e){return Object.assign(new Y,e)}),a}var o=this._categoryRepository.list().map(Y.fromCategory(e)),r=new N(t,o,e);return this._localStorage.setItem(t,JSON.stringify(r)),r}},{key:"_parseObject",value:function(e){return Object.assign(new N,JSON.parse(e))}},{key:"update",value:function(e){var t="".concat("nummus.io",".monthlyBudgets.").concat(e.month);this._localStorage.setItem(t,JSON.stringify(e))}},{key:"listMonths",value:function(){var t=this;return Object.keys(this._localStorage).filter(function(e){return e.startsWith("nummus.io.monthlyBudgets")}).map(function(e){return t._parseObject(t._localStorage.getItem(e))}).map(function(n){return new e.YearMonth(n.month,t._dateProvider)}).sort(function(e,t){return-e.toMoment().diff(t.toMoment(),"minutes")}).reverse()}},{key:"currentMonth",value:function(){return this.listMonths().filter(function(e){return e.is_current})[0]}},{key:"_initializeBudgets",value:function(){this._findOrCreate(this._now().add(1,"month").format("YYYY_MM")),this._findOrCreate(this._now().format("YYYY_MM")),this._findOrCreate(this._now().subtract(1,"month").format("YYYY_MM"))}}]),e}();function A(){return E()()}R.YearMonth=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:A;Object(i.a)(this,e),this.is_current=n().format("YYYY_MM")===t,this.yearMonth=t}return Object(u.a)(e,[{key:"formatted",value:function(){return this.toMoment().format("MMM YY")}},{key:"toMoment",value:function(){return E()(this.yearMonth,"YYYY_MM")}},{key:"previousMonth",value:function(){return new R.YearMonth(this.toMoment().subtract(1,"months").format("YYYY_MM"))}}]),e}();var I=R,B=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={expenses:n.props.expenses,showCsv:!1},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"makeItem",value:function(e,t){var n=this.props.categoriesById.get(e.categoryId),a=p.fromCents(e.amountCents).formatted();return o.a.createElement("tr",{className:"expense-row",key:t},o.a.createElement("td",null,e.formattedDate()),o.a.createElement("td",null,"\u20ac",a),o.a.createElement("td",null,n.name),o.a.createElement("td",null,o.a.createElement("input",{type:"button",value:"Delete",className:"delete-expense alert button expanded",onClick:this.deleteExpense(e).bind(this)})))}},{key:"render",value:function(){var e=this,t=this.state.expenses.map(this.makeItem.bind(this));return o.a.createElement("div",null,o.a.createElement("table",null,o.a.createElement("tbody",null,t)),o.a.createElement("button",{className:"button expanded large",onClick:function(){return e.setState({showCsv:!e.state.showCsv})}},"As csv"),o.a.createElement("div",{className:this.state.showCsv?"":"hide"},o.a.createElement("pre",null,this.expensesAsCsv())))}},{key:"deleteExpense",value:function(e){var t=this;return function(){t.props.expenseRepository.delete(e),t.setState({expenses:t.props.expenseRepository.findBy(t.props.selectedMonth)})}}},{key:"expensesAsCsv",value:function(){var e=this;return this.props.expenses.map(function(t){var n=p.fromCents(t.amountCents,",").formatted(),a=e.props.categoriesById.get(t.categoryId);return"".concat(t.formattedDate(),"\t").concat(n,"\t").concat(a.name,"\t").concat(a.tags,"\t").concat(t.comment||"")}).reverse().join("\n")+"\n\n"}}]),t}(a.Component),K=function e(t,n,a){Object(i.a)(this,e),this.name=n,this.id=t,this.tags=a},F=function(){function e(){Object(i.a)(this,e);var t=[{name:"fun",tags:["non-essential"]},{name:"groceries",tags:["essential"]},{name:"travel",tags:["non-essential"]},{name:"dining out",tags:["non-essential"]},{name:"rent",tags:["essential"]},{name:"utilities",tags:["essential"]},{name:"sports",tags:["non-essential"]},{name:"transportation",tags:["essential"]},{name:"lunch @ work",tags:["essential"]},{name:"children",tags:["essential"]},{name:"clothing",tags:["non-essential"]},{name:"unexpected",tags:["essential"]}].map(function(e,t){return new K(t,e.name,e.tags)});this.categories=t.sort(function(e,t){return e.name.localeCompare(t.name)})}return Object(u.a)(e,[{key:"list",value:function(){return this.categories}},{key:"categoriesById",value:function(){return this.list().reduce(function(e,t){return e.set(t.id,t)},new Map)}}]),e}(),U=function(){function e(){Object(i.a)(this,e),this.id=0}return Object(u.a)(e,[{key:"next",value:function(){return this.id++,this.id}}]),e}(),P=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).categories=n.props.categoryRepository.list(),n.categoriesById=n.props.categoryRepository.categoriesById(),n.expenseRepository=n.props.expenseRepository||new w(localStorage),n.state={expenses:n.expenseRepository.findBy(n.props.selectedMonth)},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"grid-x grid-padding-x"},o.a.createElement("div",{className:"large-6 medium-6 cell"},o.a.createElement(v,{categories:this.categories,onSubmit:this.expenseAdded.bind(this)})),o.a.createElement("div",{className:"large-6 medium-6 cell"},o.a.createElement(B,{categoriesById:this.categoriesById,expenses:this.state.expenses,expenseRepository:this.expenseRepository,selectedMonth:this.props.selectedMonth,ref:function(t){return e._expenseHistory=t}})))}},{key:"expenseAdded",value:function(e,t){e.preventDefault();var n=this.props.idGenerator.next(),a=O.createFromState(n,t);this.expenseRepository.add(a),this._expenseHistory.setState({expenses:this.expenseRepository.findBy(this.props.selectedMonth)}),this.setState({expenses:this.expenseRepository.findBy(this.props.selectedMonth)})}}]),t}(a.Component);P.defaultProps={idGenerator:new U};var J=P,V=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e="";if(this.props.amountSpent.rate){var t=this.props.amountSpent.rate;e=o.a.createElement("span",null,"(",t,"%)")}return o.a.createElement("tr",null,o.a.createElement("td",null,this.props.categoryName),o.a.createElement("td",null,"\u20ac",p.fromCents(this.props.amountSpent.amount).formatted()," ",e),o.a.createElement("td",null,"\u20ac",p.fromCents(this.props.amountSpent.spentPreviousMonth).formatted()),o.a.createElement("td",null,"\u20ac",p.fromCents(this.props.amountSpent.projected).formatted()))}}]),t}(a.Component),H=function(e){function t(e){var n;Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).categoriesById=n.props.categoryRepository.categoriesById();var a=Array.from(n.categoriesById).map(function(e){var t=Object(b.a)(e,2),a=t[0];t[1];return n._getAmountSpent(a).amount}).reduce(function(e,t){return e+t},0);return n.totalAmountSpent=p.fromCents(a).formatted(),n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=Array.from(this.categoriesById).map(function(t){var n=Object(b.a)(t,2),a=n[0];n[1];return o.a.createElement(V,{key:a,amountSpent:e._getAmountSpent(a),categoryName:e.categoriesById.get(a).name})});return o.a.createElement("div",null,o.a.createElement("h1",null,"Budget"),o.a.createElement("table",{className:"category-budget-table"},o.a.createElement("thead",null,o.a.createElement("tr",{className:"category-budget"},o.a.createElement("th",null,"Category"),o.a.createElement("th",null,"Total spent"),o.a.createElement("th",null,"Previous month"),o.a.createElement("th",null,"Projected"))),o.a.createElement("tbody",null,t)),o.a.createElement("p",null,"Total expenses: \u20ac",this.totalAmountSpent))}},{key:"getAmount",value:function(e){return p.fromCents(this._getAmountSpent(e).amount).formatted()}},{key:"getProjection",value:function(e){return p.fromCents(this._getAmountSpent(e).projected).formatted()}},{key:"_getAmountSpent",value:function(e){var t=this.props.amountSpentByCategory.get(e);return t||new _(0)}}]),t}(a.Component),T=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"monthChanged",value:function(e){this.props.onMonthChanged(this.props.budgetRepository.findMonth(e.target.value))}},{key:"render",value:function(){var e=this.props.budgetRepository.listMonths(),t=this.props.budgetRepository.currentMonth(),n=e.map(function(e){return o.a.createElement("option",{value:e.yearMonth,key:e.yearMonth},e.formatted())});return o.a.createElement("div",null,o.a.createElement("select",{defaultValue:t.yearMonth,onChange:this.monthChanged.bind(this)},n))}}]),t}(a.Component),L=function(){function e(t,n){Object(i.a)(this,e),this._apiKey=t,this._userUuid=n}return Object(u.a)(e,[{key:"sync",value:function(e){return fetch("".concat("https://hi6kvr95o9.execute-api.us-east-1.amazonaws.com/prod","/sync/").concat(this._userUuid),{method:"POST",mode:"cors",headers:{"X-Api-Key":this._apiKey},body:e}).then(function(e){return e.json()}).then(function(e){return{dump:JSON.stringify(e),success:!0}},function(e){return{success:!1,reason:e}})}}]),e}(),W=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={},n.state.dump=n.props.expenseRepository.dump(),n.state.loading=!1,n.state.uploadCompleted="",n.state.apiKey=n.props.expenseRepository.apiKey(),n.state.userUuid=n.props.expenseRepository.userUuid(),n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"loadDump",value:function(){this.props.expenseRepository.loadDump(this.state.dump)}},{key:"textAreaChanged",value:function(e){this.setState({dump:e.target.value})}},{key:"apiKeyChanged",value:function(e){this.setState({apiKey:e.target.value}),this.props.expenseRepository.saveApiKey(e.target.value)}},{key:"uuidChanged",value:function(e){this.setState({userUuid:e.target.value}),this.props.expenseRepository.setUserUuid(e.target.value)}},{key:"uploadExpenses",value:function(){var e=this;this.setState({loading:!0});var t=this;new L(this.state.apiKey,this.state.userUuid).sync(this.state.dump).then(function(n){n.success?(t.setState({uploadCompleted:"Sync completed",dump:n.dump,loading:!1}),e.props.expenseRepository.loadDump(n.dump)):t.setState({uploadFailed:"Failed to sync. Reason: "+n.reason,loading:!1})})}},{key:"downloadExpenses",value:function(){var e=this;fetch("".concat("https://hi6kvr95o9.execute-api.us-east-1.amazonaws.com/prod","/sync/").concat(this.state.userUuid),{method:"GET",mode:"cors",headers:{"X-Api-Key":this.state.apiKey}}).then(function(e){return e.json()}).then(function(t){e.setState({dump:JSON.stringify(t),downloadCompleted:"Download completed"})})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Admin"),o.a.createElement("div",{className:"form-group"},o.a.createElement("button",{className:"expense-form-submit button",onClick:this.uploadExpenses.bind(this)},"Sync expenses"),o.a.createElement("div",{className:this.state.uploadCompleted?"":"hide"},o.a.createElement("div",{className:"callout success"},o.a.createElement("p",null,this.state.uploadCompleted))),o.a.createElement("div",{className:this.state.uploadFailed?"":"hide"},o.a.createElement("div",{className:"callout alert"},o.a.createElement("p",null,this.state.uploadFailed))),o.a.createElement("div",{className:this.state.loading?"lds-dual-ring":"hide"})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"apiKey"},"Api key"),o.a.createElement("input",{value:this.state.apiKey,className:"form-control",type:"text",id:"apiKey",placeholder:"Enter api key",onChange:this.apiKeyChanged.bind(this)}),o.a.createElement("label",{htmlFor:"userUuid"},"User uuid"),o.a.createElement("input",{value:this.state.userUuid,className:"form-control",type:"text",id:"userUuid",placeholder:"Enter user UUID",onChange:this.uuidChanged.bind(this)})),o.a.createElement("hr",null),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"expensesData"},"Expenses dump"),o.a.createElement("textarea",{id:"expensesData",value:this.state.dump,className:"form-control",onChange:this.textAreaChanged.bind(this)})),o.a.createElement("button",{className:"expense-form-submit button",onClick:this.loadDump.bind(this)},"Load dump"))}},{key:"getAmount",value:function(e){return this.state.remainingAmounts.get(e.categoryId)}}]),t}(a.Component),z=n(35),G=n(34),X=n(36),Q=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).categoryRepository=new F,n.budgetRepository=new I(localStorage,n.categoryRepository),n.expenseRepository=new w(localStorage),n.state={selectedMonth:n.budgetRepository.currentMonth()},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"syncBackendState",value:function(){var e=this.expenseRepository.apiKey(),t=this.expenseRepository.userUuid(),n=this.expenseRepository;e&&t&&this.expenseRepository.shouldSync(E()())&&new L(e,t).sync(this.expenseRepository.dump()).then(function(e){e.success&&(n.loadDump(e.dump),n.synced())})}},{key:"makeExpensesDash",value:function(){return o.a.createElement(J,{idGenerator:new j,categoryRepository:this.categoryRepository,selectedMonth:this.state.selectedMonth})}},{key:"makeBudgetDash",value:function(){return o.a.createElement(H,{categoryRepository:this.categoryRepository,budgetRepository:this.budgetRepository,amountSpentByCategory:this.expenseRepository.amountsByCategory(this.state.selectedMonth),selectedMonth:this.state.selectedMonth})}},{key:"componentDidMount",value:function(){this.syncBackendState()}},{key:"makeAdminDash",value:function(){return o.a.createElement(W,{expenseRepository:this.expenseRepository})}},{key:"monthChanged",value:function(e){this.setState({selectedMonth:e})}},{key:"render",value:function(){return o.a.createElement(z.a,null,o.a.createElement("div",null,o.a.createElement("div",{className:"top-bar",id:"responsive-menu"},o.a.createElement("div",{className:"top-bar-left"},o.a.createElement("ul",{className:"dropdown menu","data-dropdown-menu":!0},o.a.createElement("li",{className:"menu-text"},o.a.createElement(G.a,{to:"/nummus/"},"Nummus")),o.a.createElement("li",null,o.a.createElement(G.a,{to:"/nummus/budget/"},"Budget")),o.a.createElement("li",null,o.a.createElement(G.a,{to:"/nummus/admin"},"Admin")),o.a.createElement("li",null,o.a.createElement(T,{budgetRepository:this.budgetRepository,onMonthChanged:this.monthChanged.bind(this)}))))),o.a.createElement("div",{className:"grid-container main-container"},o.a.createElement(X.a,{exact:!0,path:"/nummus/",component:this.makeExpensesDash.bind(this)}),o.a.createElement(X.a,{path:"/nummus/budget/",component:this.makeBudgetDash.bind(this)}),o.a.createElement(X.a,{path:"/nummus/admin/",component:this.makeAdminDash.bind(this)}))))}}]),t}(a.Component),$=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function q(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}s.a.render(o.a.createElement(Q,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(window.addEventListener("beforeinstallprompt",function(e){console.log(e.platforms),e.userChoice.then(function(e){console.log(e)},function(){})}),new URL("/nummus",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/nummus","/service-worker.js");$?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):q(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):q(e)})}}()}},[[20,1,2]]]);
//# sourceMappingURL=main.6acbeacd.chunk.js.map