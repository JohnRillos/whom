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
  `.^(contact:gc %gx (weld base-path /contact/(scot %p our)/noun))
::
++  scry-profile-field
  |=  key=@tas
  ^-  (unit info-field:whom)
  %+  biff  scry-profile
  |=  con=contact:gc
  ?+  key      ~
    %bio       `[%text bio.con]
    %nickname  `[%text nickname.con]
    %status    `[%text status.con]
    %avatar    (bind avatar.con (lead %look))
    %color     `[%tint color.con]
    %cover     (bind cover.con (lead %look))
    %groups    `[%coll groups.con]
  ==
::
++  scry-contact
  |=  =ship
  ^-  (unit contact:gc)
  ?.  is-running  ~
  =/  =rolodex:gc  ~+  .^(rolodex:gc %gx (weld base-path /all/noun))
  ?.  (~(has by rolodex) ship)  ~
  :-  ~
  ~+  .^(contact:gc %gx (weld base-path /contact/(scot %p ship)/noun))
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
        :~  :-  %bio       `[%text bio.con]
            :-  %nickname  `[%text nickname.con]
            :-  %avatar    (bind avatar.con (lead %look))
            :-  %color     `[%tint color.con]
            :-  %cover     (bind cover.con (lead %look))
            :-  %groups    `[%coll groups.con]
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
  ^-  (map groups-profile-key:whom info-field:whom)
  %-  my
  ^-  (list (pair groups-profile-key:whom info-field:whom))
  %+  murn
    ^-  (list [groups-profile-key:whom (unit info-field:whom)])
    :~  :-  %bio       `[%text bio.con]
        :-  %nickname  `[%text nickname.con]
        :-  %status    `[%text status.con]
        :-  %avatar    (bind avatar.con (lead %look))
        :-  %color     `[%tint color.con]
        :-  %cover     (bind cover.con (lead %look))
        :-  %groups    `[%coll groups.con]
    ==
  |=  [key=groups-profile-key:whom field=(unit info-field:whom)]
  ^-  (unit (pair groups-profile-key:whom info-field:whom))
  (bind field (lead key))
::
--
