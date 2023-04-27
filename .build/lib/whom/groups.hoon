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
++  scry-profile-field
  |=  key=@tas
  ^-  (unit @t)
  =/  =contact:gc  ~+  .^(contact:gc %gx (weld base-path /contact/(scot %p our)/noun))
  ?+  key      ~
    %bio       `bio.contact
    %nickname  `nickname.contact
  ==
--
