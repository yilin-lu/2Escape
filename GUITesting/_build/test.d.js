// Generated by js_of_ocaml 3.0.1
(function(joo_global_object)
   {"use strict";
    function raw_array_append_one(a,x)
     {var l=a.length,b=new Array(l + 1),i=0;
      for(;i < l;i++)b[i] = a[i];
      b[i] = x;
      return b}
    function raw_array_sub(a,i,l)
     {var b=new Array(l);for(var j=0;j < l;j++)b[j] = a[i + j];return b}
    function caml_call_gen(f,args)
     {if(f.fun)return caml_call_gen(f.fun,args);
      var n=f.length,argsLen=args.length,d=n - argsLen;
      if(d == 0)
       return f.apply(null,args);
      else
       if(d < 0)
        return caml_call_gen
                (f.apply(null,raw_array_sub(args,0,n)),
                 raw_array_sub(args,n,argsLen - n));
       else
        return function(x)
         {return caml_call_gen(f,raw_array_append_one(args,x))}}
    var caml_oo_last_id=0;
    function caml_fresh_oo_id(){return caml_oo_last_id++}
    var caml_js_regexps={amp:/&/g,lt:/</g,quot:/\"/g,all:/[&<\"]/};
    function caml_js_html_escape(s)
     {if(!caml_js_regexps.all.test(s))return s;
      return s.replace(caml_js_regexps.amp,"&amp;").replace
               (caml_js_regexps.lt,"&lt;").replace
              (caml_js_regexps.quot,"&quot;")}
    function caml_is_ascii(s)
     {if(s.length < 24)
       {for(var i=0;i < s.length;i++)if(s.charCodeAt(i) > 127)return false;
        return true}
      else
       return !/[^\x00-\x7f]/.test(s)}
    function caml_utf8_of_utf16(s)
     {for(var b="",t=b,c,d,i=0,l=s.length;i < l;i++)
       {c = s.charCodeAt(i);
        if(c < 128)
         {for(var j=i + 1;j < l && (c = s.charCodeAt(j)) < 128;j++);
          if(j - i > 512)
           {t.substr(0,1);b += t;t = "";b += s.slice(i,j)}
          else
           t += s.slice(i,j);
          if(j == l)break;
          i = j}
        if(c < 2048)
         {t += String.fromCharCode(192 | c >> 6);
          t += String.fromCharCode(128 | c & 63)}
        else
         if(c < 55296 || c >= 57343)
          t
          +=
          String.fromCharCode(224 | c >> 12,128 | c >> 6 & 63,128 | c & 63);
         else
          if
           (c
            >=
            56319
            ||
            i
            +
            1
            ==
            l
            ||
            (d = s.charCodeAt(i + 1))
            <
            56320
            ||
            d
            >
            57343)
           t += "\xef\xbf\xbd";
          else
           {i++;
            c = (c << 10) + d - 56613888;
            t
            +=
            String.fromCharCode
             (240 | c >> 18,128 | c >> 12 & 63,128 | c >> 6 & 63,128 | c & 63)}
        if(t.length > 1024){t.substr(0,1);b += t;t = ""}}
      return b + t}
    function caml_str_repeat(n,s)
     {if(s.repeat)return s.repeat(n);
      var r="",l=0;
      if(n == 0)return r;
      for(;;)
       {if(n & 1)r += s;
        n >>= 1;
        if(n == 0)return r;
        s += s;
        l++;
        if(l == 9)s.slice(0,1)}}
    function caml_subarray_to_string(a,i,len)
     {var f=String.fromCharCode;
      if(i == 0 && len <= 4096 && len == a.length)return f.apply(null,a);
      var s="";
      for(;0 < len;i += 1024,len -= 1024)
       s += f.apply(null,raw_array_sub(a,i,Math.min(len,1024)));
      return s}
    function caml_convert_string_to_bytes(s)
     {if(s.t == 2)
       s.c += caml_str_repeat(s.l - s.c.length,"\0");
      else
       s.c = caml_subarray_to_string(s.c,0,s.c.length);
      s.t = 0}
    function caml_utf16_of_utf8(s)
     {for(var b="",t="",c,c1,c2,v,i=0,l=s.length;i < l;i++)
       {c1 = s.charCodeAt(i);
        if(c1 < 128)
         {for(var j=i + 1;j < l && (c1 = s.charCodeAt(j)) < 128;j++);
          if(j - i > 512)
           {t.substr(0,1);b += t;t = "";b += s.slice(i,j)}
          else
           t += s.slice(i,j);
          if(j == l)break;
          i = j}
        v = 1;
        if(++i < l && ((c2 = s.charCodeAt(i)) & -64) == 128)
         {c = c2 + (c1 << 6);
          if(c1 < 224)
           {v = c - 12416;if(v < 128)v = 1}
          else
           {v = 2;
            if(++i < l && ((c2 = s.charCodeAt(i)) & -64) == 128)
             {c = c2 + (c << 6);
              if(c1 < 240)
               {v = c - 925824;if(v < 2048 || v >= 55295 && v < 57344)v = 2}
              else
               {v = 3;
                if
                 (++i
                  <
                  l
                  &&
                  ((c2 = s.charCodeAt(i)) & -64)
                  ==
                  128
                  &&
                  c1
                  <
                  245)
                 {v = c2 - 63447168 + (c << 6);
                  if(v < 65536 || v > 1114111)v = 3}}}}}
        if(v < 4)
         {i -= v;t += "\ufffd"}
        else
         if(v > 65535)
          t += String.fromCharCode(55232 + (v >> 10),56320 + (v & 1023));
         else
          t += String.fromCharCode(v);
        if(t.length > 1024){t.substr(0,1);b += t;t = ""}}
      return b + t}
    function caml_to_js_string(s)
     {switch(s.t)
       {case 9:return s.c;
        default:caml_convert_string_to_bytes(s);case 0:
         if(caml_is_ascii(s.c)){s.t = 9;return s.c}s.t = 8;
        case 8:return caml_utf16_of_utf8(s.c)
        }}
    function MlString(tag,contents,length)
     {this.t = tag;this.c = contents;this.l = length}
    MlString.prototype.toString = function(){return caml_to_js_string(this)};
    function caml_js_to_string(s)
     {var tag=9;
      if(!caml_is_ascii(s))tag = 8,s = caml_utf8_of_utf16(s);
      return new MlString(tag,s,s.length)}
    function caml_raise_with_arg(tag,arg){throw [0,tag,arg]}
    function caml_new_string(s){return new MlString(0,s,s.length)}
    function caml_raise_with_string(tag,msg)
     {caml_raise_with_arg(tag,caml_new_string(msg))}
    var caml_global_data=[0];
    function caml_raise_sys_error(msg)
     {caml_raise_with_string(caml_global_data.Sys_error,msg)}
    var caml_ml_channels=new Array();
    function caml_ml_flush(chanid)
     {var chan=caml_ml_channels[chanid];
      if(!chan.opened)caml_raise_sys_error("Cannot flush a closed channel");
      if(!chan.buffer || chan.buffer == "")return 0;
      if
       (chan.fd
        &&
        caml_global_data.fds[chan.fd]
        &&
        caml_global_data.fds[chan.fd].output)
       {var output=caml_global_data.fds[chan.fd].output;
        switch(output.length)
         {case 2:output(chanid,chan.buffer);break;default:output(chan.buffer)}}
      chan.buffer = "";
      return 0}
    if(joo_global_object.process && joo_global_object.process.cwd)
     var caml_current_dir=joo_global_object.process.cwd().replace(/\\/g,"/");
    else
     var caml_current_dir="/static";
    if(caml_current_dir.slice(-1) !== "/")caml_current_dir += "/";
    function caml_make_path(name)
     {name = name instanceof MlString?name.toString():name;
      if(name.charCodeAt(0) != 47)name = caml_current_dir + name;
      var comp=name.split("/"),ncomp=[];
      for(var i=0;i < comp.length;i++)
       switch(comp[i])
        {case "..":if(ncomp.length > 1)ncomp.pop();break;
         case ".":break;
         case "":if(ncomp.length == 0)ncomp.push("");break;
         default:ncomp.push(comp[i]);break}
      ncomp.orig = name;
      return ncomp}
    function caml_raise_no_such_file(name)
     {name = name instanceof MlString?name.toString():name;
      caml_raise_sys_error(name + ": No such file or directory")}
    function caml_string_of_array(a){return new MlString(4,a,a.length)}
    function caml_invalid_argument(msg)
     {caml_raise_with_string(caml_global_data.Invalid_argument,msg)}
    function caml_string_bound_error()
     {caml_invalid_argument("index out of bounds")}
    function caml_string_unsafe_get(s,i)
     {switch(s.t & 6)
       {default:if(i >= s.c.length)return 0;case 0:return s.c.charCodeAt(i);
        case 4:return s.c[i]
        }}
    function caml_string_get(s,i)
     {if(i >>> 0 >= s.l)caml_string_bound_error();
      return caml_string_unsafe_get(s,i)}
    function caml_create_string(len)
     {if(len < 0)caml_invalid_argument("String.create");
      return new MlString(len?2:9,"",len)}
    function caml_ml_string_length(s){return s.l}
    function caml_convert_string_to_array(s)
     {if(joo_global_object.Uint8Array)
       var a=new (joo_global_object.Uint8Array)(s.l);
      else
       var a=new Array(s.l);
      var b=s.c,l=b.length,i=0;
      for(;i < l;i++)a[i] = b.charCodeAt(i);
      for(l = s.l;i < l;i++)a[i] = 0;
      s.c = a;
      s.t = 4;
      return a}
    function caml_blit_string(s1,i1,s2,i2,len)
     {if(len == 0)return 0;
      if(i2 == 0 && (len >= s2.l || s2.t == 2 && len >= s2.c.length))
       {s2.c
        =
        s1.t == 4
         ?caml_subarray_to_string(s1.c,i1,len)
         :i1 == 0 && s1.c.length == len?s1.c:s1.c.substr(i1,len);
        s2.t = s2.c.length == s2.l?0:2}
      else
       if(s2.t == 2 && i2 == s2.c.length)
        {s2.c
         +=
         s1.t == 4
          ?caml_subarray_to_string(s1.c,i1,len)
          :i1 == 0 && s1.c.length == len?s1.c:s1.c.substr(i1,len);
         s2.t = s2.c.length == s2.l?0:2}
       else
        {if(s2.t != 4)caml_convert_string_to_array(s2);
         var c1=s1.c,c2=s2.c;
         if(s1.t == 4)
          if(i2 <= i1)
           for(var i=0;i < len;i++)c2[i2 + i] = c1[i1 + i];
          else
           for(var i=len - 1;i >= 0;i--)c2[i2 + i] = c1[i1 + i];
         else
          {var l=Math.min(len,c1.length - i1);
           for(var i=0;i < l;i++)c2[i2 + i] = c1.charCodeAt(i1 + i);
           for(;i < len;i++)c2[i2 + i] = 0}}
      return 0}
    function MlFile(){}
    function MlFakeFile(content){this.data = content}
    MlFakeFile.prototype = new MlFile();
    MlFakeFile.prototype.truncate
    =
    function(len)
     {var old=this.data;
      this.data = caml_create_string(len | 0);
      caml_blit_string(old,0,this.data,0,len)};
    MlFakeFile.prototype.length
    =
    function(){return caml_ml_string_length(this.data)};
    MlFakeFile.prototype.write
    =
    function(offset,buf,pos,len)
     {var clen=this.length();
      if(offset + len >= clen)
       {var new_str=caml_create_string(offset + len),old_data=this.data;
        this.data = new_str;
        caml_blit_string(old_data,0,this.data,0,clen)}
      caml_blit_string(buf,pos,this.data,offset,len);
      return 0};
    MlFakeFile.prototype.read
    =
    function(offset,buf,pos,len)
     {var clen=this.length();
      caml_blit_string(this.data,offset,buf,pos,len);
      return 0};
    MlFakeFile.prototype.read_one
    =
    function(offset){return caml_string_get(this.data,offset)};
    MlFakeFile.prototype.close = function(){};
    MlFakeFile.prototype.constructor = MlFakeFile;
    function MlFakeDevice(root,f)
     {this.content = {};this.root = root;this.lookupFun = f}
    MlFakeDevice.prototype.nm = function(name){return this.root + name};
    MlFakeDevice.prototype.lookup
    =
    function(name)
     {if(!this.content[name] && this.lookupFun)
       {var
         res=
          this.lookupFun(caml_new_string(this.root),caml_new_string(name));
        if(res != 0)this.content[name] = new MlFakeFile(res[1])}};
    MlFakeDevice.prototype.exists
    =
    function(name)
     {if(name == "")return 1;
      var name_slash=name + "/",r=new RegExp("^" + name_slash);
      for(var n in this.content)if(n.match(r))return 1;
      this.lookup(name);
      return this.content[name]?1:0};
    MlFakeDevice.prototype.readdir
    =
    function(name)
     {var
       name_slash=name == ""?"":name + "/",
       r=new RegExp("^" + name_slash + "([^/]*)"),
       seen={},
       a=[];
      for(var n in this.content)
       {var m=n.match(r);if(m && !seen[m[1]]){seen[m[1]] = true;a.push(m[1])}}
      return a};
    MlFakeDevice.prototype.is_dir
    =
    function(name)
     {var
       name_slash=name == ""?"":name + "/",
       r=new RegExp("^" + name_slash + "([^/]*)"),
       a=[];
      for(var n in this.content){var m=n.match(r);if(m)return 1}
      return 0};
    MlFakeDevice.prototype.unlink
    =
    function(name)
     {var ok=this.content[name]?true:false;
      delete this.content[name];
      return ok};
    MlFakeDevice.prototype.open
    =
    function(name,f)
     {if(f.rdonly && f.wronly)
       caml_raise_sys_error
        (this.nm(name)
         +
         " : flags Open_rdonly and Open_wronly are not compatible");
      if(f.text && f.binary)
       caml_raise_sys_error
        (this.nm(name)
         +
         " : flags Open_text and Open_binary are not compatible");
      this.lookup(name);
      if(this.content[name])
       {if(this.is_dir(name))
         caml_raise_sys_error(this.nm(name) + " : is a directory");
        if(f.create && f.excl)
         caml_raise_sys_error(this.nm(name) + " : file already exists");
        var file=this.content[name];
        if(f.truncate)file.truncate();
        return file}
      else
       if(f.create)
        {this.content[name] = new MlFakeFile(caml_create_string(0));
         return this.content[name]}
       else
        caml_raise_no_such_file(this.nm(name))};
    MlFakeDevice.prototype.register
    =
    function(name,content)
     {if(this.content[name])
       caml_raise_sys_error(this.nm(name) + " : file already exists");
      if(content instanceof MlString)
       this.content[name] = new MlFakeFile(content);
      else
       if(content instanceof Array)
        this.content[name] = new MlFakeFile(caml_string_of_array(content));
       else
        if(content.toString)
         {var mlstring=caml_new_string(content.toString());
          this.content[name] = new MlFakeFile(mlstring)}};
    MlFakeDevice.prototype.constructor = MlFakeDevice;
    function caml_array_of_string(s)
     {if(s.t != 4)caml_convert_string_to_array(s);return s.c}
    function caml_string_unsafe_set(s,i,c)
     {c &= 255;
      if(s.t != 4)
       {if(i == s.c.length)
         {s.c += String.fromCharCode(c);if(i + 1 == s.l)s.t = 0;return 0}
        caml_convert_string_to_array(s)}
      s.c[i] = c;
      return 0}
    function caml_string_set(s,i,c)
     {if(i >>> 0 >= s.l)caml_string_bound_error();
      return caml_string_unsafe_set(s,i,c)}
    var Buffer=joo_global_object.Buffer;
    function MlNodeFile(fd){this.fs = require("fs");this.fd = fd}
    MlNodeFile.prototype = new MlFile();
    MlNodeFile.prototype.truncate
    =
    function(len){this.fs.ftruncateSync(this.fd,len | 0)};
    MlNodeFile.prototype.length
    =
    function(){return this.fs.fstatSync(this.fd).size};
    MlNodeFile.prototype.write
    =
    function(offset,buf,buf_offset,len)
     {var a=caml_array_of_string(buf);
      if(!a instanceof joo_global_object.Uint8Array)
       a = new (joo_global_object.Uint8Array)(a);
      var buffer=new Buffer(a);
      this.fs.writeSync(this.fd,buffer,buf_offset,len,offset);
      return 0};
    MlNodeFile.prototype.read
    =
    function(offset,buf,buf_offset,len)
     {var a=caml_array_of_string(buf);
      if(!(a instanceof joo_global_object.Uint8Array))
       a = new (joo_global_object.Uint8Array)(a);
      var buffer=new Buffer(a);
      this.fs.readSync(this.fd,buffer,buf_offset,len,offset);
      for(var i=0;i < len;i++)
       caml_string_set(buf,buf_offset + i,buffer[buf_offset + i]);
      return 0};
    MlNodeFile.prototype.read_one
    =
    function(offset)
     {var a=new (joo_global_object.Uint8Array)(1),buffer=new Buffer(a);
      this.fs.readSync(this.fd,buffer,0,1,offset);
      return buffer[0]};
    MlNodeFile.prototype.close = function(){this.fs.closeSync(this.fd)};
    MlNodeFile.prototype.constructor = MlNodeFile;
    function MlNodeDevice(root){this.fs = require("fs");this.root = root}
    MlNodeDevice.prototype.nm = function(name){return this.root + name};
    MlNodeDevice.prototype.exists
    =
    function(name){return this.fs.existsSync(this.nm(name))?1:0};
    MlNodeDevice.prototype.readdir
    =
    function(name){return this.fs.readdirSync(this.nm(name))};
    MlNodeDevice.prototype.is_dir
    =
    function(name){return this.fs.statSync(this.nm(name)).isDirectory()?1:0};
    MlNodeDevice.prototype.unlink
    =
    function(name)
     {var b=this.fs.existsSync(this.nm(name))?1:0;
      this.fs.unlinkSync(this.nm(name));
      return b};
    MlNodeDevice.prototype.open
    =
    function(name,f)
     {var consts=require("constants"),res=0;
      for(var key in f)
       switch(key)
        {case "rdonly":res |= consts.O_RDONLY;break;
         case "wronly":res |= consts.O_WRONLY;break;
         case "append":res |= consts.O_WRONLY | consts.O_APPEND;break;
         case "create":res |= consts.O_CREAT;break;
         case "truncate":res |= consts.O_TRUNC;break;
         case "excl":res |= consts.O_EXCL;break;
         case "binary":res |= consts.O_BINARY;break;
         case "text":res |= consts.O_TEXT;break;
         case "nonblock":res |= consts.O_NONBLOCK;break
         }
      var fd=this.fs.openSync(this.nm(name),res);
      return new MlNodeFile(fd)};
    MlNodeDevice.prototype.rename
    =
    function(o,n){this.fs.renameSync(this.nm(o),this.nm(n))};
    MlNodeDevice.prototype.constructor = MlNodeDevice;
    var caml_root=caml_current_dir.match(/[^\/]*\//)[0],jsoo_mount_point=[];
    if
     (typeof module
      !==
      "undefined"
      &&
      module.exports
      &&
      typeof require
      !==
      "undefined")
     jsoo_mount_point.push
      ({path:caml_root,device:new MlNodeDevice(caml_root)});
    else
     jsoo_mount_point.push
      ({path:caml_root,device:new MlFakeDevice(caml_root)});
    jsoo_mount_point.push
     ({path:caml_root + "static/",
       device:new MlFakeDevice(caml_root + "static/")});
    function resolve_fs_device(name)
     {var
       path=caml_make_path(name),
       name=path.join("/"),
       name_slash=name + "/",
       res;
      for(var i=0;i < jsoo_mount_point.length;i++)
       {var m=jsoo_mount_point[i];
        if
         (name_slash.search(m.path)
          ==
          0
          &&
          (!res || res.path.length < m.path.length))
         res
         =
         {path:m.path,
          device:m.device,
          rest:name.substring(m.path.length,name.length)}}
      return res}
    function caml_std_output(chanid,s)
     {var
       chan=caml_ml_channels[chanid],
       str=caml_new_string(s),
       slen=caml_ml_string_length(str);
      chan.file.write(chan.offset,str,0,slen);
      chan.offset += slen;
      return 0}
    function js_print_stderr(s)
     {var g=joo_global_object;
      if(g.process && g.process.stdout && g.process.stdout.write)
       g.process.stderr.write(s);
      else
       {if(s.charCodeAt(s.length - 1) == 10)s = s.substr(0,s.length - 1);
        var v=g.console;
        v && v.error && v.error(s)}}
    function js_print_stdout(s)
     {var g=joo_global_object;
      if(g.process && g.process.stdout && g.process.stdout.write)
       g.process.stdout.write(s);
      else
       {if(s.charCodeAt(s.length - 1) == 10)s = s.substr(0,s.length - 1);
        var v=g.console;
        v && v.log && v.log(s)}}
    function caml_sys_open_internal(idx,output,file,flags)
     {if(caml_global_data.fds === undefined)
       caml_global_data.fds = new Array();
      flags = flags?flags:{};
      var info={};
      info.file = file;
      info.offset = flags.append?file.length():0;
      info.flags = flags;
      info.output = output;
      caml_global_data.fds[idx] = info;
      if(!caml_global_data.fd_last_idx || idx > caml_global_data.fd_last_idx)
       caml_global_data.fd_last_idx = idx;
      return idx}
    function caml_sys_open(name,flags,_perms)
     {var f={};
      while(flags)
       {switch(flags[1])
         {case 0:f.rdonly = 1;break;
          case 1:f.wronly = 1;break;
          case 2:f.append = 1;break;
          case 3:f.create = 1;break;
          case 4:f.truncate = 1;break;
          case 5:f.excl = 1;break;
          case 6:f.binary = 1;break;
          case 7:f.text = 1;break;
          case 8:f.nonblock = 1;break
          }
        flags = flags[2]}
      if(f.rdonly && f.wronly)
       caml_raise_sys_error
        (name.toString()
         +
         " : flags Open_rdonly and Open_wronly are not compatible");
      if(f.text && f.binary)
       caml_raise_sys_error
        (name.toString()
         +
         " : flags Open_text and Open_binary are not compatible");
      var
       root=resolve_fs_device(name),
       file=root.device.open(root.rest,f),
       idx=caml_global_data.fd_last_idx?caml_global_data.fd_last_idx:0;
      return caml_sys_open_internal(idx + 1,caml_std_output,file,f)}
    caml_sys_open_internal
     (0,caml_std_output,new MlFakeFile(caml_create_string(0)));
    caml_sys_open_internal
     (1,js_print_stdout,new MlFakeFile(caml_create_string(0)));
    caml_sys_open_internal
     (2,js_print_stderr,new MlFakeFile(caml_create_string(0)));
    function caml_ml_open_descriptor_in(fd)
     {var data=caml_global_data.fds[fd];
      if(data.flags.wronly)caml_raise_sys_error("fd " + fd + " is writeonly");
      var
       channel=
        {file:data.file,
         offset:data.offset,
         fd:fd,
         opened:true,
         out:false,
         refill:null};
      caml_ml_channels[channel.fd] = channel;
      return channel.fd}
    function caml_ml_open_descriptor_out(fd)
     {var data=caml_global_data.fds[fd];
      if(data.flags.rdonly)caml_raise_sys_error("fd " + fd + " is readonly");
      var
       channel=
        {file:data.file,
         offset:data.offset,
         fd:fd,
         opened:true,
         out:true,
         buffer:""};
      caml_ml_channels[channel.fd] = channel;
      return channel.fd}
    function caml_ml_out_channels_list()
     {var l=0;
      for(var c=0;c < caml_ml_channels.length;c++)
       if
        (caml_ml_channels[c]
         &&
         caml_ml_channels[c].opened
         &&
         caml_ml_channels[c].out)
        l = [0,caml_ml_channels[c].fd,l];
      return l}
    function caml_obj_tag(x)
     {return x instanceof Array?x[0]:x instanceof MlString?252:1e3}
    function caml_register_global(n,v,name_opt)
     {caml_global_data[n + 1] = v;if(name_opt)caml_global_data[name_opt] = v}
    var caml_named_values={};
    function caml_bytes_of_string(s)
     {if((s.t & 6) != 0)caml_convert_string_to_bytes(s);return s.c}
    function caml_register_named_value(nm,v)
     {caml_named_values[caml_bytes_of_string(nm)] = v;return 0}
    function caml_return_exn_constant(tag){return tag}
    function caml_named_value(nm){return caml_named_values[nm]}
    function caml_wrap_exception(e)
     {if(e instanceof Array)return e;
      if
       (joo_global_object.RangeError
        &&
        e instanceof joo_global_object.RangeError
        &&
        e.message
        &&
        e.message.match(/maximum call stack/i))
       return caml_return_exn_constant(caml_global_data.Stack_overflow);
      if
       (joo_global_object.InternalError
        &&
        e instanceof joo_global_object.InternalError
        &&
        e.message
        &&
        e.message.match(/too much recursion/i))
       return caml_return_exn_constant(caml_global_data.Stack_overflow);
      if(e instanceof joo_global_object.Error && caml_named_value("jsError"))
       return [0,caml_named_value("jsError"),e];
      return [0,caml_global_data.Failure,caml_js_to_string(String(e))]}
    function caml_call1(f,a0)
     {return f.length == 1?f(a0):caml_call_gen(f,[a0])}
    var
     Out_of_memory=[248,caml_new_string("Out_of_memory"),-1],
     Sys_error=[248,caml_new_string("Sys_error"),-2],
     Failure=[248,caml_new_string("Failure"),-3],
     Invalid_argument=[248,caml_new_string("Invalid_argument"),-4],
     End_of_file=[248,caml_new_string("End_of_file"),-5],
     Division_by_zero=[248,caml_new_string("Division_by_zero"),-6],
     Not_found=[248,caml_new_string("Not_found"),-7],
     Match_failure=[248,caml_new_string("Match_failure"),-8],
     Stack_overflow=[248,caml_new_string("Stack_overflow"),-9],
     Sys_blocked_io=[248,caml_new_string("Sys_blocked_io"),-10],
     Assert_failure=[248,caml_new_string("Assert_failure"),-11],
     Undefined_recursive_module=
      [248,caml_new_string("Undefined_recursive_module"),-12];
    caml_register_global
     (11,Undefined_recursive_module,"Undefined_recursive_module");
    caml_register_global(10,Assert_failure,"Assert_failure");
    caml_register_global(9,Sys_blocked_io,"Sys_blocked_io");
    caml_register_global(8,Stack_overflow,"Stack_overflow");
    caml_register_global(7,Match_failure,"Match_failure");
    caml_register_global(6,Not_found,"Not_found");
    caml_register_global(5,Division_by_zero,"Division_by_zero");
    caml_register_global(4,End_of_file,"End_of_file");
    caml_register_global(3,Invalid_argument,"Invalid_argument");
    caml_register_global(2,Failure,"Failure");
    caml_register_global(1,Sys_error,"Sys_error");
    caml_register_global(0,Out_of_memory,"Out_of_memory");
    caml_fresh_oo_id(0);
    caml_ml_open_descriptor_in(0);
    caml_ml_open_descriptor_out(1);
    caml_ml_open_descriptor_out(2);
    caml_fresh_oo_id(0);
    caml_fresh_oo_id(0);
    var
     printers=[0,0],
     _a_=caml_new_string("Js.Error"),
     _f_=caml_new_string("table"),
     _e_=caml_new_string("img"),
     _d_=caml_new_string("div"),
     _c_=caml_new_string("textarea"),
     _b_=caml_new_string("input"),
     _g_=[0,caml_new_string("test.ml"),8,20];
    function register_printer(fn){printers[1] = [0,fn,printers[1]];return 0}
    var
     window=joo_global_object,
     no_handler=null,
     undefined$0=undefined,
     array_constructor=window.Array,
     Error=[248,_a_,caml_fresh_oo_id(0)],
     exn=[0,Error,{}],
     slot=caml_obj_tag(exn) === 248?exn:exn[1];
    caml_register_named_value(caml_new_string("jsError"),slot);
    (function(exn){throw exn});
    register_printer
     (function(param)
       {if(param[1] === Error)
         {var e=param[2];return [0,caml_js_to_string(e.toString())]}
        return 0});
    register_printer
     (function(e)
       {return e instanceof array_constructor
                ?0
                :[0,caml_js_to_string(e.toString())]});
    function appendChild(p,n){p.appendChild(n);return 0}
    var doc=window.document;
    function opt_iter(x,f){if(x){var v=x[1];return caml_call1(f,v)}return 0}
    function createElement(doc,name)
     {return doc.createElement(name.toString())}
    function unsafeCreateElement(doc,name){return createElement(doc,name)}
    var createElementSyntax=[0,785140586];
    function unsafeCreateElementEx(type,name,doc$0,elt)
     {for(;;)
       {if(0 === type)if(0 === name)return createElement(doc$0,elt);
        var _k_=createElementSyntax[1];
        if(785140586 === _k_)
         {try
           {var
             el=doc.createElement('<input name="x">'),
             _n_=el.tagName.toLowerCase() === "input"?1:0,
             _o_=_n_?el.name === "x"?1:0:_n_,
             _l_=_o_}
          catch(_p_){var _l_=0}
          var _m_=_l_?982028505:-1003883683;
          createElementSyntax[1] = _m_;
          continue}
        if(982028505 <= _k_)
         {var a=new array_constructor();
          a.push("<",elt.toString());
          opt_iter
           (type,
            function(t){a.push(' type="',caml_js_html_escape(t),'"');return 0});
          opt_iter
           (name,
            function(n){a.push(' name="',caml_js_html_escape(n),'"');return 0});
          a.push(">");
          return doc$0.createElement(a.join(""))}
        var res=createElement(doc$0,elt);
        opt_iter(type,function(t){return res.type = t});
        opt_iter(name,function(n){return res.name = n});
        return res}}
    function createDiv(doc){return unsafeCreateElement(doc,_d_)}
    caml_fresh_oo_id(0);
    var html_element=window.HTMLElement;
    html_element === undefined$0;
    var body=doc.getElementById("body");
    if(body == no_handler)throw [0,Assert_failure,_g_];
    var div=createDiv(doc);
    div.style.cssText = "margin-bottom:20px;";
    var
     style=
      "border-collapse:collapse;line-height: 0; opacity: 1; margin-left:auto; margin-right:auto; background-color: black",
     td_style="padding: 0; width: 20px; height: 20px;",
     m=unsafeCreateElement(doc,_f_);
    m.style.cssText = style;
    var y=0;
    a:
    for(;;)
     {var tr=m.insertRow(-1),x=0;
      for(;;)
       {var td=tr.insertCell(-1);
        td.style.cssText = td_style;
        var img=unsafeCreateElement(doc,_e_),match=x % 2 | 0;
        img.src = 0 === match?"boulder.png":"grass.png";
        appendChild(td,img);
        appendChild(tr,td);
        var _i_=x + 1 | 0;
        if(24 !== x){var x=_i_;continue}
        appendChild(m,tr);
        var _h_=y + 1 | 0;
        if(10 !== y){var y=_h_;continue a}
        var div2=createDiv(doc);
        div2.style.cssText
        =
        "border-collapse:collapse;line-height: 0; opacity: 1; margin: auto;";
        var textArea=unsafeCreateElementEx(0,0,doc,_c_),chat=createDiv(doc);
        textArea.defaultValue = "wtf";
        textArea.cols = 49;
        textArea.rows = 10;
        textArea.readOnly = !!1;
        textArea.style.cssText = "resize: none";
        var
         name=[0,"sample"],
         type=[0,"text"],
         input=unsafeCreateElementEx(type,name,doc,_b_);
        input.defaultValue = "something";
        input.size = 50;
        var f=function(ev){textArea.value = "omg";return !!1};
        input.onkeydown
        =
        function(e)
         {if(1 - (e == no_handler?1:0))
           {var res=f(e);if(1 - (res | 0))e.preventDefault();return res}
          var e$0=event,res$0=f(e$0);
          if(1 - (res$0 | 0))e$0.returnValue = res$0;
          return res$0};
        var inputdiv=createDiv(doc),outputdiv=createDiv(doc);
        appendChild(inputdiv,input);
        appendChild(outputdiv,textArea);
        appendChild(div,m);
        appendChild(chat,outputdiv);
        appendChild(chat,inputdiv);
        appendChild(div2,chat);
        body.style.cssText
        =
        "font-family: sans-serif; text-align: center; background-color: #e8e8e8;";
        appendChild(body,div);
        appendChild(body,div2);
        var
         iter=
          function(param)
           {var param$0=param;
            for(;;)
             {if(param$0)
               {var l=param$0[2],a=param$0[1];
                try
                 {caml_ml_flush(a)}
                catch(_j_)
                 {_j_ = caml_wrap_exception(_j_);
                  if(_j_[1] !== Sys_error)throw _j_}
                var param$0=l;
                continue}
              return 0}};
        iter(caml_ml_out_channels_list(0));
        return}}}
  (function(){return this}()));
