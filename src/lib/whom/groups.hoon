/-  cs=contact-store, whom
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
  =/  =update:cs  [%edit our [edit-field] now]
  [%pass /profile-update %agent [our %contact-store] %poke %contact-update-0 !>(update)]
::
+$  scry-result  $%(update:cs [~ ~])
::
++  scry-profile-field
  |=  key=@tas
  ^-  (unit @t)
  =/  base-path=path  /(scot %p our)/contact-store/(scot %da now)
  ?.  .^(? %gu base-path)  ~
  =/  raw  .^(scry-result %gx (weld base-path /contact/(scot %p our)/noun))
  ?:  =([~ ~] raw)  ~
  =/  =update:cs  (update:cs raw)
  ?.  ?=(%add -.update)  ~
  ?+  key  ~
    %bio       (sani bio.contact.update)
    %nickname  (sani nickname.contact.update)
  ==
::
++  sani
  |=  =cord
  ^-  (unit @t)
  ?:  =('' cord)  ~
  `cord
--
