function requestScores(content){
	var ajax = new XMLHttpRequest();
	var method = "GET";
	var url = "./../php/responseScores.php";
	var asynch = true;
	var xmlHttp;
	try { xmlHttp=new XMLHttpRequest(); }
	catch (e)
	{	try { xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); }
		catch (e)
			{ try { xmlHttp=new ActiveXObject("Microsoft.XMLHTTP"); }
			catch (e)
				{window.alert("Your browser does not support AJAX!");
					return;
				}
			}
	}
	xmlHttp.open(method, url, asynch);
	xmlHttp.onreadystatechange = useHttpResponse;
	xmlHttp.send(null);
	function useHttpResponse(){
		if(xmlHttp.readyState == 4){
			var data = JSON.parse(xmlHttp.responseText);
			createScoreTable(data, content);
		}
	}

}