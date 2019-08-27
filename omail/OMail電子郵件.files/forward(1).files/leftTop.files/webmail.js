function OpenWnd(u,n,w,h,l,t,x) {
  args="width="+w+",height="+h+",left="+l+",top="+t+",resizable=yes,scrollbars=yes,status=0";
  newwnd=window.open(u,n,args);
  if (newwnd != null) {
    if (newwnd.opener == null)
      newwnd.opener = self;
  }
  if (x == 1) { return newwnd; }
}
