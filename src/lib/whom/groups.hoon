/-  gc=contacts, whom
|_  bowl:gall
::
+$  card  card:agent:gall
::
+$  whom-edit  (unit [=info-field:whom =access-level:whom])
::
+$  profile-key  groups-profile-key:whom
::
++  edit-groups-profile
  |=  edits=(map @tas whom-edit)
  ^-  (list card)
  :_  ~
  %-  edit-fields
  ;:  weld
    (drop (get-edit-field edits %bio ''))
    (drop (get-edit-field edits %nickname ''))
    (drop (get-edit-field edits %status ''))
    (drop (get-edit-field edits %avatar ~))
    (drop (get-edit-field edits %color 0x0))
    (drop (get-edit-field edits %cover ~))
          (replace-groups edits)
  ==
::
++  get-edit-field
  |=  [edits=(map @tas whom-edit) key=profile-key empty=*]
  ^-  (unit field:gc)
  %+  bind  (~(get by edits) key)
  |=  =whom-edit
  %-  field:gc
  :-  key
  ?~  whom-edit  empty
  =/  =info-field:whom  info-field.u.whom-edit
  ?+  -.info-field  !!
    %text   +.info-field
    %tint   +.info-field
    %look  `+.info-field
  ==
::
++  replace-groups
  |=  [edits=(map @tas whom-edit)]
  ^-  (list field:gc)
  ?~  here=(~(get by edits) %groups)  ~
  =/  =whom-edit  u.here
  =/  prof=(unit contact:gc)  scry-profile
  ?~  prof  ~
  =/  old=(set [@p @ta])  groups.u.prof
  =/  new=(set [@p @ta])
    ?~  whom-edit  ~
    =/  =info-field:whom  info-field.u.whom-edit
    ?>  ?=(%coll -.info-field)
    +.info-field
  =/  add=(list field:gc)
    (turn ~(tap in (~(dif in new) old)) (lead %add-group))
  =/  del=(list field:gc)
    (turn ~(tap in (~(dif in old) new)) (lead %del-group))
  (weld add del)
::
++  edit-fields
  |=  fields=(list field:gc)
  ^-  card
  =/  =action:gc  [%edit fields]
  [%pass /profile-update %agent [our %contacts] %poke %contact-action-0 !>(action)]
::
++  base-path  /(scot %p our)/contacts/(scot %da now)
::
++  is-running  ~+  .^(? %gu (weld base-path /$))
::
++  scry-profile  ~+
  ^-  (unit contact:gc)
  ?.  is-running  ~
  `.^(contact:gc %gx (weld base-path /contact/(scot %p our)/contact))
::
++  scry-profile-field
  |=  key=@tas
  ^-  (unit info-field:whom)
  %+  biff  scry-profile
  |=  con=contact:gc
  ?+  key      ~
    %bio       (as-text bio.con)
    %nickname  (as-text nickname.con)
    %status    (as-text status.con)
    %avatar    (as-look avatar.con)
    %color     (as-tint color.con)
    %cover     (as-look cover.con)
    %groups    (as-coll groups.con)
  ==
::
++  scry-contact
  |=  =ship
  ^-  (unit contact:gc)
  ?.  is-running  ~
  =/  =rolodex:gc  ~+  .^(rolodex:gc %gx (weld base-path /all/contact-rolodex))
  ?.  (~(has by rolodex) ship)  ~
  :-  ~
  ~+  .^(contact:gc %gx (weld base-path /contact/(scot %p ship)/contact))
::
++  scry-contact-as-profile
  |=  =ship
  ^-  (unit profile:whom)
  %+  bind  (scry-contact ship)
  |=  con=contact:gc
  ^-  profile:whom
  :-  %-  my
      ^-  (list (pair @tas [info-field:whom access-level:whom]))
      %+  murn
        ^-  (list [@tas (unit info-field:whom)])
        :~  :-  %bio       (as-text bio.con)
            :-  %nickname  (as-text nickname.con)
            :-  %avatar    (as-look avatar.con)
            :-  %color     (as-tint color.con)
            :-  %cover     (as-look cover.con)
            :-  %groups    (as-coll groups.con)
        ==
      |=  [key=@tas field=(unit info-field:whom)]
      ^-  (unit (pair @tas [info-field:whom access-level:whom]))
      ?~  field  ~
      `[key [u.field %public]]
  %-  my
  :~  :-  %bio       ['Bio' %text]
      :-  %nickname  ['Nickname' %text]
      :-  %avatar    ['Avatar' %look]
      :-  %color     ['Sigil Color' %tint]
      :-  %cover     ['Cover Image' %look]
      :-  %groups    ['Favorite Groups' %coll]
  ==
::
++  contact-as-map
  |=  con=contact:gc
  ^-  (map groups-profile-key:whom (unit info-field:whom))
  %-  my
  ^-  (list (pair groups-profile-key:whom (unit info-field:whom)))
  :~  :-  %bio       (as-text bio.con)
      :-  %nickname  (as-text nickname.con)
      :-  %status    (as-text status.con)
      :-  %avatar    (as-look avatar.con)
      :-  %color     (as-tint color.con)
      :-  %cover     (as-look cover.con)
      :-  %groups    (as-coll groups.con)
  ==
::
++  as-text
  |=  =cord
  ?~  cord  ~
  `[%text cord]
::
++  as-tint
  |=  hex=@ux
  ?~  hex  ~
  `[%tint hex]
::
++  as-look
  |=  luk=(unit @t)
  ?~    luk  ~
  ?~  u.luk  ~
  `[%look u.luk]
::
++  as-coll
  |=  col=coll:whom
  ?~  col  ~
  `[%coll col]
::
--
