<%
    getHost = Request.ServerVariables("HTTP_HOST")
%>

<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="format-detection" content="telephone=no, email=no, address=no">
<meta name="keywords" content="ServeQ, 서브큐, 식자재유통, 삼양사, 식자재, 서브큐 세미나, 식품소재, 유지" />

<meta property="og:type" content="website">
<meta property="og:title" content="ServeQ">
<meta property="og:image" content="<%= getHost %>/pjtCom/images/common/og_img.png">
<meta property="og:url" content="<%= getHost %>">

<link rel="shortcut icon" type="image/x-icon" href="/pjtCom/images/common/favicon.ico">

<link rel="stylesheet" type="text/css" href="/pjtCom/css/lib/normalize.min.css" />
<link rel="stylesheet" type="text/css" href="/pjtCom/css/lib/jquery-ui.min.css">
<link rel="stylesheet" type="text/css" href="/pjtCom/css/common.css" />


<script src="/pjtCom/js/lib/jquery-3.3.1.min.js"></script>
<script src="/pjtCom/js/lib/jquery-ui.min.js"></script>



<title><%If path3tit <> "" Then Response.write path3tit+" - " Else If path3tit = "" AND path2tit <> "" Then Response.write path2tit+" - " End If %>ServeQ</title>
