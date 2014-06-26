module.exports = {

  sc_code: function () {
    var code = 'SC';
    var chars1 = "123456789";
    var chars2 = "ABCDEFGHIJKLMNPQRSTUVWXTZ";
    var string_length1 = 4;
    var string_length2 = 2;
    var randomstring_alpha = '';
    var randomstring_num = '';

    for (var i=0; i<string_length2; i++) {
      var rnum = Math.floor(Math.random() * chars2.length);
      randomstring_alpha += chars2.substring(rnum,rnum+1);
    }
    for (var j=0; j<string_length1; j++) {
      var rnum = Math.floor(Math.random() * chars1.length);
      randomstring_num += chars1.substring(rnum,rnum+1);
    }

    return code+randomstring_num;
  }

}