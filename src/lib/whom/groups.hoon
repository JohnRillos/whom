/-  gc=contacts, whom
|_  bowl:gall
::
+$  card  card:agent:gall
::
+$  whom-edit  (unit [=info-field:whom =access-level:whom])
::
+$  profile-key  ?(%bio %nickname)
::
++  edit-groups-profile
  |=  edits=(map @tas whom-edit)
  ^-  (list card)
  =/  bio  (get-edit-field edits %bio)
  =/  nic  (get-edit-field edits %nickname)
  [(edit-fields (weld (drop bio) (drop nic)))]~
::
++  get-edit-field
  |=  [edits=(map @tas whom-edit) key=profile-key]
  ^-  (unit field:gc)
  %+  bind  (~(get by edits) key)
  |=  =whom-edit
  %-  field:gc
  :-  key
  ?~  whom-edit  ''
  =/  =info-field:whom  info-field.u.whom-edit
  ?>  ?=(%text -.info-field)
  +.info-field
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
++  scry-profile-field
  |=  key=@tas
  ^-  (unit @t)
  ?.  is-running  ~
  =/  =contact:gc  ~+  .^(contact:gc %gx (weld base-path /contact/(scot %p our)/noun))
  ?+  key      ~
    %bio       `bio.contact
    %nickname  `nickname.contact
  ==
::
++  scry-contact
  |=  =ship
  ^-  (unit [bio=@t nickname=@t])
  ?.  is-running  ~
  =/  =rolodex:gc  ~+  .^(rolodex:gc %gx (weld base-path /all/noun))
  ?.  (~(has by rolodex) ship)  ~
  =/  =contact:gc  ~+  .^(contact:gc %gx (weld base-path /contact/(scot %p ship)/noun))
  `[bio.contact nickname.contact]
::
++  scry-contact-as-profile
  |=  =ship
  ^-  (unit profile:whom)
  %+  bind  (scry-contact ship)
  |=  [bio=@t nickname=@t]
  ^-  profile:whom
  :-  %-  my
      :~  :-  %bio       [[%text bio] %public]
          :-  %nickname  [[%text nickname] %public]
      ==
  %-  my
  :~  :-  %bio       ['Bio' %text]
      :-  %nickname  ['Nickname' %text]
  ==
--
