<%@page import="java.io.PrintWriter"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isErrorPage="true"  %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>系统异常</title>
<style type="text/css">
<!--
H1 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:22px;} 
H2 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:16px;} 
H3 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:14px;} 
BODY {font-family:Tahoma,Arial,sans-serif;color:black;background-color:white;} 
B {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;} 
P {font-family:Tahoma,Arial,sans-serif;background:white;color:black;font-size:12px;}
A {color : black;}
A.name {color : black;}
HR {color : #525D76;}
-->
</style>
</head>
<body>
<h1>HTTP Status 500 - <%=exception.getMessage()%></h1>
<hr size="1" noshade="noshade" />
<p><b>异常信息</b><u><%=exception.getMessage()%></u></p>
<p><b>详细信息</b>
<pre><%exception.printStackTrace(new PrintWriter(out)); %></pre>
</p>
<hr size="1" noshade="noshade" />
</body>
</html>