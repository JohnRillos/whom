/-  *whom
/+  scry=pals
|_  =bowl:gall
++  get
  ~+
  ^-  pals-info
  :-  ~(running scry bowl)
  ^-  (map @p pal)
  =/  targets=(set @p)  (~(targets scry bowl) ~.)
  =/  leeches=(set @p)  ~(leeches scry bowl)
  =/  allofem=(set @p)  (~(uni in targets) leeches)
  %-  ~(gas by *(map @p pal))
  %+  turn  ~(tap in allofem)
  |=  =ship
  =/  target  (~(has in targets) ship)
  =/  leeche  (~(has in leeches) ship)
  ^-  [@p pal]
  :*  ship
      target=target
      leeche=leeche
      mutual=&(target leeche)
  ==
--