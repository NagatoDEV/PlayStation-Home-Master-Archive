<?
function image_expire($image){
	$image = $_SERVER['DOCUMENT_ROOT']."/homestore/img/".$image;
	$imagee = $_SERVER['DOCUMENT_ROOT']."/homestore/img/expire/".basename($image);
	$iurl = "/homestore/img/expire/".basename($image);
	if (file_exists($imagee)){
		return $iurl;
	}
	$watermark=$_SERVER['DOCUMENT_ROOT']."/homestore/img/expire.png";
	$im = imagecreatefrompng($watermark);
	if (!$im2 = imagecreatefrompng($image)) {
		echo "Error opening ".basename($image)."!";
	}
	imagecopy($im2, $im, (imagesx($im2)-(imagesx($im))), (imagesy($im2))-(imagesy($im)), 0, 0, imagesx($im), imagesy($im));
	imagepng($im2,$imagee,4);
	imagedestroy($im);
	imagedestroy($im2);
	return $iurl;
}
?>