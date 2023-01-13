/-  cs=contact-store, whom
|_  =bowl:gall
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
  %+  turn  (weld (drop bio) (drop nic))
  edit-one-field
::
++  get-edit-field
  |=  [edits=(map @tas whom-edit) key=profile-key]
  ^-  (unit edit-field:cs)
  %+  bind  (~(get by edits) key)
  |=  =whom-edit
  %-  edit-field:cs
  :-  key
  ?~  whom-edit  ''
  =/  =info-field:whom  info-field.u.whom-edit
  ?>  ?=(%text -.info-field)
  +.info-field
::
++  edit-one-field
  |=  =edit-field:cs
  ^-  card
  =/  =update:cs  [%edit our.bowl [edit-field] now.bowl]
  [%pass /profile-update %agent [our.bowl %contact-store] %poke %contact-update-0 !>(update)]
--
