"/portal/mis_fichadas"===window.location.pathname&&_Horario(),"/portal/novedades_asistencia"===window.location.pathname&&_Asistencia();var server="https://sysi-lp.github.io/rrhhHorario/";function _Horario(){$.getScript("http://momentjs.com/downloads/moment-with-locales.min.js",function(){moment.locale("es");var a=obtenerHorario(348e5),e=18e5;calcular(a,e),$("select").on("change",function(){setCookie($(this).attr("dataDate"),$(this).val(),60),calcular(a,e)}),$.getScript(server+"jquery-clock-timepicker.min.js",function(){$(".boletaInst").clockTimePicker(),$(".boletaInst").on("change",function(){setCookie($(this).attr("dataDate"),$(this).val(),60),calcular(a,e)})})})}function _Asistencia(){$.getScript("http://momentjs.com/downloads/moment-with-locales.min.js",function(){moment.locale("en"),asistencia()})}function calcular(a,e){var t=$("main div.container div.row > div.col")[0],o=null;n=nombreUsuario(),dia=null,$(t).children().each(function(t,i){var r=null,s=0,d=0;switch(t){case 1:dia=obtenerDia(i);break;case 2:o=obtenerHoraIngreso(i,a);break;case 5:if((r=obtenerFichadas(i)).length>0){var l=calcularPermanencia(o,r,a,e,n,dia),c="Hora de ingreso: "+o.format("HH:mm:ss");Cargarformulario(i,dia),mostrar(l,i,c,o,a,e),s=compensacion(l,o,a,e),d=l.enEdificio,setCookie(n+dia,s,60),setCookie(n+dia+"enEdificio",d,60),historicoSemana(dia,i)}break;case 8:dia=obtenerDia(i);case 9:""!==dia&&(o=obtenerHoraIngreso(i,a));break;case 12:if((r=obtenerFichadas(i)).length>0&&""!==dia){l=calcularPermanencia(o,r,a,e,n,dia),c="Hora de ingreso: "+o.format("HH:mm:ss");Cargarformulario(i,dia),mostrar(l,i,c,o,a,e),s=compensacion(l,o,a,e),d=l.enEdificio,setCookie(n+dia,s,60),setCookie(n+dia+"enEdificio",d,60),historicoSemana(dia,i)}}})}function obtenerHoraIngreso(a,e){var t=e.horarioIngreso;try{var o=moment($(a).find("h1.center").html().trim().slice(-8),"HH:mm:ss")}catch(a){o=t;console.log("Error en obtenerHoraIngreso (Primera Fichada)")}switch(getCookie(n+dia+"comision")){case"Entrada":return t;default:return EsControlable()?o>t?o:t:o}}function obtenerHorario(a){var e=$("main div.container div.row > div.col")[0],t=moment(),o=moment(),i=a,n=!1;return $(e).children().each(function(a,e){switch(a){case 4:try{var r=$(e).find("h6.center");t=moment($(r[0]).html().trim(),"HH:mm"),o=moment($(r[1]).html().trim(),"HH:mm"),i=o.diff(t)}catch(a){console.log("Error en obtener horarios 1"),n=!0}break;case 11:if(n)try{r=$(e).find("h6.center");t=moment($(r[0]).html().trim(),"HH:mm"),o=moment($(r[1]).html().trim(),"HH:mm"),i=o.diff(t)}catch(a){console.log("Error en obtener horarios 2")}}}),{horarioIngreso:t,horarioEgreso:o,Ths:i}}function obtenerFichadas(a){var e=[],t="",o="";return $(a).find("#tabla3 tbody tr").each(function(){var a="HH:mm:ss";hora=$(this).find("td:nth(0)").html(),hora.indexOf(" ")>0&&(a="DD-MM-YYYY "+a),hh=moment(hora,a),(t=$(this).find("td:nth(1)").html())!=o&&e.push({fichada:hh,tipo:t}),o=t}),e}function calcularPermanencia(a,e,t,o,i,n){var r=0,s=0,d=0;getCookie(i+n+"comision");if(e.length>0){e[0]={fichada:a,tipo:"Entrada"};for(var l=1;l<e.length;l+=2)r+=moment.duration(e[l].fichada.diff(e[l-1].fichada));var c=moment();"Entrada"==e[e.length-1].tipo?(r+=moment.duration(c.diff(e[e.length-1].fichada)),ultima=c,d=t.Ths-o-r):ultima=e[e.length-1].fichada,s=moment.duration(ultima.diff(e[0].fichada))}return{enEdificio:r,fuera:s-r,falta:d,total:s}}function Cargarformulario(a,e){var t=$(a).find(".resumen"),o=document.getElementById("linkestilo"),i=(new Date).getTime();if(null===o&&($("head").append('<link type="text/css" href="'+server+"Horario.css?t="+i+'" rel="Stylesheet" id="linkestilo">'),$("head").append('<link type="text/css" href="'+server+"bootstrap.css?t="+i+'" rel="Stylesheet" id="linkestilo">')),null===t||0===t.length){var n;$.ajax({type:"GET",url:server+"Horario.html?t="+i,async:!1,success:function(a){n=a}}),$(a).append(n);var r=nombreUsuario(),s=getCookie(r+e+"comision");SetearComision(a,s,e);var d=getCookie(r+e+"boleta");SetearBoleta(a,d,e),BotonSonidoView(),$(".licencia").attr("href",server+"License.txt"),$(".detalleDia").click(function(e){e.preventDefault();var t=$(this),o=$($(a).find(".resumen #detalleDia"));t.hasClass("show")?(t.removeClass("show"),t.html('<i class="fa fa-plus"></i>'),o.slideUp(350)):(t.toggleClass("show"),t.html('<i class="fa fa-minus"></i>'),o.slideToggle(350))}),$(".detalleSemana").click(function(e){e.preventDefault();var t=$(this),o=$($(a).find("#detalleSemana"));t.hasClass("show")?(t.removeClass("show"),t.html('<i class="fa fa-plus"></i>'),o.slideUp(350)):(t.toggleClass("show"),t.html('<i class="fa fa-minus"></i>'),o.slideToggle(350))})}}function BotonSonidoView(){$(".salida").click(function(){SonidoView()})}function mostrar(a,e,t,o,i,n){var r=$(e).find(".resumen"),s=compensacion(a,o,i,n),d=$(r).find("table tbody tr"),l=0;if(0!==a.falta){var c=moment().add(a.falta,"ms"),m=o.add(i.Ths,"ms");(c>m||s<0)&&a.enEdificio>216e5?(l=CalcualarBoleta(c,m,a.fuera,n,a,i),c>m&&(c=m)):c>m&&(c=m),c<moment()&&0===$("main div.container").find("div.chau").length&&($("main div.container").prepend('<div class="chau col s12" style="background-color:orange;"><h3 style="background-color:orange;"><center>¡¡Chauuu!! Te podes ir <i class="fa fa-hand-stop-o" aria-hidden="true"></i></center></h1></div>'),parpadear(),window.actualizarSonido||(SonidoView(),alerta("Horario cumplido","info"),window.actualizarSonido=setInterval(function(){alerta("Horario cumplido","info")},10500))),window.actualizarPermanencia||(window.actualizarPermanencia=setInterval(function(){calcular(i,n)},1e3))}else{r=o.clone();((c=o.add(a.total.asMilliseconds(),"ms"))>(m=r.add(i.Ths,"ms"))||s<0)&&a.enEdificio>216e5&&(l=CalcualarBoleta(c,m,a.fuera,n,a,i))}l=CalcualarBoleta(c,m,a.fuera,n,a,i),$(e).find("span.fuera").html(formatearHora(a.fuera)),$(e).find("span.edificio").html(formatearHora(a.enEdificio)),d.find(".compensacion").html(formatearHora(s)),l>0?($(e).find("span.boleta").html(formatearHora(l)),$(d).find(".boleta").html(formatearHora(l)),$(d).find(".boleta").removeClass().addClass("label label-danger boleta")):($(d).find(".boleta").html(formatearHora(0)),$(d).find(".boleta").removeClass().addClass("boleta")),$(e).find("span.salida").html(c.format("HH:mm:ss"));var f=$(e).find(".resumen div.box-header .box-title")[0];$(f).html("Resumen del día( "+t+")")}function CalcualarBoletaOld(a,e,t,o,i,n){var r=0;return(r=a>e?t-o:n.Ths-i.enEdificio-o)>0?r:0}function CalcualarBoleta(a,e,t,o,i,n){var r,s,d=0;return(d=(r=t-o)>(s=n.Ths-i.enEdificio-o)?r:s)>0?d:0}function obtenerComision(a){var e="",t=$(a).find(".resumen"),o=$(t).find("table tbody tr");0===!o.length&&(e=$(o).find(".comision").val());return e}function SetearComision(a,e,t){var o=$(a).find(".resumen"),i=$(o).find("table tbody tr");if(0!==i.length){var r=$(i).find(".comision");r.val(e),n=nombreUsuario(),r.attr("dataDate",n+t+"comision")}}function obtenerBoleta(a){var e="",t=$(a).find(".resumen"),o=$(t).find("table tbody tr");0===!o.length&&(e=$(o).find(".boletaInst").val());return e}function obtenerBoletaDuration(a){var e=moment("00:00","HH:mm"),t=moment.duration(e.diff(e)),o=getCookie(n+dia+"boleta");if(""!==o){var i=moment(o,"HH:mm");t=moment.duration(i.diff(e))}return t}function SetearBoleta(a,e,t){var o=$(a).find(".resumen"),i=$(o).find("table tbody tr");if(0!==i.length){var r=$(i).find(".boletaInst");r.val(e),n=nombreUsuario(),r.attr("dataDate",n+t+"boleta")}}function compensacion(a,e,t,o){var i=0;switch(getCookie(n+dia+"comision")){case"Salida":case"Día":i=0;break;default:if(a.total>0)if(a.falta<=0&&a.fuera<=o&&a.enEdificio>t.Ths-o){if(i=a.total-t.Ths,""!==getCookie(n+dia+"boleta"))i+=obtenerBoletaDuration();i<0&&(i=0)}else{if(i=a.total-t.Ths-(a.fuera-o),""!==getCookie(n+dia+"boleta"))(i+=obtenerBoletaDuration())>0&&(i=0)}}var r=72e5;return t.Ths>=288e5&&(r=48e5),i>r&&(i=r),i}function formatearHora(a){var e=moment.duration(a);return pad(e.get("h"),2)+":"+pad(e.get("m"),2)+":"+pad(e.get("s"),2)}function formatearHoraH(a){var e=moment.duration(a),t=parseInt(e.asHours()),o=moment.duration(e-moment.duration(t,"hours")).minutes();return pad(t,2)+":"+pad(o,2)}function pad(a,e){for(var t=a+"";t.length<e;)t="0"+t;return t}function obtenerDia(a){var e="";try{e=$(a).find("h6.center").html().trim()}catch(a){console.log("Error en obtener dia")}return e}function setCookie(a,e,t){var o=new Date;o.setTime(o.getTime()+24*t*60*60*1e3);var i="expires="+o.toUTCString();document.cookie=a+"="+e+";"+i+";path=/"}function getCookie(a){for(var e=a+"=",t=document.cookie.split(";"),o=0;o<t.length;o++){for(var i=t[o];" "==i.charAt(0);)i=i.substring(1);if(0===i.indexOf(e))return i.substring(e.length,i.length)}return""}function ProcesarDia(a){$("#fecha_historial").val(a),$(".btn").trigger("click")}function diadelaSemana(a,e){for(var t=!1,o=0;o<=6;o+=1)if(a.day(o).format("YYYYMMDD")===e.format("YYYYMMDD")){t=!0;break}return t}function historicoSemana(a,e){for(var t=moment(a,"DD-MM-YYYY"),o=moment(moment().format("DD-MM-YYYY"),"DD-MM-YYYY"),i=null,n=0,r=0,s="<li><b>Compensación:</b></li><br />",d="<li><b>En Edificio:</b></li><br />",l=nombreUsuario(),c=1;c<6;c+=1)t.day(c)<=o&&(s+='<div class="col-md-2">',s+='<div class="box box-default">',""!==(i=getCookie(l+t.day(c).format("DD-MM-YYYY")))?(n+=1*i,t.day(c)<o&&1*i,s+='<div class="box-header with-border">',s+='\t<h3 style="text-align:center;background-color:transparent;color:#444;font-variant:normal;" class="box-title">',s+=t.day(c).format("dddd"),s+="\t</h3>",s+="</div>",s+='<div class="box-body" style="text-align:center;">',s+=""+formatearHora(1*i),s+="</div>",s+='<div style="background:#f4f4f4;font-size:13px;" class="box-footer text-center">',s+="\t<a href=\"javascript:ProcesarDia('"+t.day(c).format("DD-MM-YYYY")+"')\"> Actualizar",s+='\t\t<i class="fa fa-refresh"></i>',s+="\t</a>",s+="</div>"):(s+='<div class="box-header with-border">',s+='\t<h3 style="text-align:center;background-color:transparent;color:#444;font-variant:normal;" class="box-title">',s+=t.day(c).format("dddd"),s+="\t</h3>",s+="</div>",s+='<div class="box-body" style="text-align:center;">',s+=""+formatearHora(0),s+="</div>",s+='<div style="background:#f4f4f4;font-size:13px;" class="box-footer text-center">',s+="\t<a href=\"javascript:ProcesarDia('"+t.day(c).format("DD-MM-YYYY")+"')\"> Actualizar",s+='\t\t<i class="fa fa-refresh"></i>',s+="\t</a>",s+="</div>"),s+="</div>",s+="</div>",d+='<div class="col-md-2">',d+='<div class="box box-default">',k2=getCookie(l+t.day(c).format("DD-MM-YYYY")+"enEdificio"),""!==k2?(r+=1*k2,d+='<div class="box-header with-border">',d+='\t<h3 style="text-align:center;background-color:transparent;color:#444;font-variant:normal;" class="box-title">',d+=t.day(c).format("dddd"),d+="\t</h3>",d+="</div>",d+='<div class="box-body" style="text-align:center;">',d+=""+formatearHora(1*k2),d+="</div>",d+='<div style="background:#f4f4f4;font-size:13px;" class="box-footer text-center">',d+="\t<a href=\"javascript:ProcesarDia('"+t.day(c).format("DD-MM-YYYY")+"')\"> Actualizar",d+='\t\t<i class="fa fa-refresh"></i>',d+="\t</a>",d+="</div>"):(d+='<div class="box-header with-border">',d+='\t<h3 style="text-align:center;background-color:transparent;color:#444;font-variant:normal;" class="box-title">',d+=t.day(c).format("dddd"),d+="\t</h3>",d+="</div>",d+='<div class="box-body" style="text-align:center;">',d+=""+formatearHora(0),d+="</div>",d+='<div style="background:#f4f4f4;font-size:13px;" class="box-footer text-center">',d+="\t<a href=\"javascript:ProcesarDia('"+t.day(c).format("DD-MM-YYYY")+"')\"> Actualizar",d+='\t\t<i class="fa fa-refresh"></i>',d+="\t</a>",d+="</div>"),d+="</div>",d+="</div>");var m='<div class="row"><div class="col-xs-12">'+s+'</div></div><div class="row"><div class="col-xs-12">'+d+"</div></div>";$(e).find("span.hist").html(m),$(e).find("span.s-compensacion").html(formatearHora(n)),$(e).find("span.s-enedificio").html(formatearHoraH(r))}function EsControlable(){var a=!1;return $("main i.tooltipped").each(function(e,t){"Controlable"===$(t).attr("data-tooltip")&&(a=!0)}),a}function nombreUsuario(){return $("#header-nombre-usuario").text().trim()}function asistencia(){n=nombreUsuario(),$("#mi_asistencia_tbl tbody tr").each(function(a){comp=0,Edif=0,obj=null,$(this).children("td").each(function(a){switch(a){case 0:d=moment($(this).text(),"DD-MMM-YY"),obj=$(this);break;case 1:comp+=mostraDatosComp(n,d,$(this),1),Edif+=mostraDatosEnEdif(n,d,$(this),1);break;case 2:comp+=mostraDatosComp(n,d,$(this),2),Edif+=mostraDatosEnEdif(n,d,$(this),2);break;case 3:comp+=mostraDatosComp(n,d,$(this),3),Edif+=mostraDatosEnEdif(n,d,$(this),3);break;case 4:comp+=mostraDatosComp(n,d,$(this),4),Edif+=mostraDatosEnEdif(n,d,$(this),4);break;case 5:comp+=mostraDatosComp(n,d,$(this),5),Edif+=mostraDatosEnEdif(n,d,$(this),5)}}),s=obj.html(),obj.html(s+"<br/>Comp: "+formatearHoraH(comp)+"<br/>en Edif: "+formatearHoraH(Edif))})}function mostraDatosComp(a,e,t,o){return k=getCookie(a+e.day(o).format("DD-MM-YYYY")),compensa=0,""!==k&&(compensa=1*k),s=t.html(),t.html(s+"<br/>Comp: "+formatearHora(compensa)),compensa}function mostraDatosEnEdif(a,e,t,o){return Edif=0,k2=getCookie(a+e.day(o).format("DD-MM-YYYY")+"enEdificio"),""!==k2&&(Edif=1*k2),s=t.html(),t.html(s+"<br/>en Edif: "+formatearHora(Edif)),Edif}function parpadear(){$(".chau").fadeIn(350).delay(150).fadeOut(350,parpadear)}function SonidoView(){$($("#chat-message-audio")[0]).attr("src",server+"sonido.mp3"),$("#chat-message-audio")[0].load(),$("#chat-message-audio")[0].play()}function dragElement(a){var e=0,t=0,o=0,i=0;function n(a){a=a||window.event,o=a.clientX,i=a.clientY,document.onmouseup=s,document.onmousemove=r}function r(n){n=n||window.event,e=o-n.clientX,t=i-n.clientY,o=n.clientX,i=n.clientY,a.style.top=a.offsetTop-t+"px",a.style.left=a.offsetLeft-e+"px"}function s(){document.onmouseup=null,document.onmousemove=null}document.getElementById(a.id+"header")?document.getElementById(a.id+"header").onmousedown=n:a.onmousedown=n}
