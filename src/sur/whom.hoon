|%
::
+$  contact
  $:  info=(map @tas info-field)
      profile=(unit profile)
  ==
::
+$  self
  $:  info=(map @tas [value=info-field access=access-level])
  ==
::
+$  access-level  ?(%public %mutual)
::
+$  profile
  $:  info=(map @tas [value=info-field access=access-level])
      fields=(map @tas field-def)
  ==
::
+$  action
  $%  [%add-contact ship=(unit @p) =contact]
      [%del-contact key=(each @p @t)]
      [%mod-contact-info key=(each @p @t) info=(map @tas (unit info-field))]
      [%mod-contact-ship key=(each @p @t) ship=(unit @p)]
      [%add-field key=@tas def=field-def]
      [%del-field key=@tas]
      [%mod-self info=(map @tas (unit [val=info-field level=access-level]))]
      [%pal-sync enabled=?]
      [%hey-pal =ship]
      [%bye-pal =ship]
  ==
::
+$  field-def  [name=@t type=field-type-tag]
::
+$  field-type-tag  ?(%text %date %look %tint %coll)
::
+$  info-field
  $%  [%text @t]
      [%date @da]
      [%look @t]   :: link to image
      [%tint @ux]  :: color (0-255)
      [%coll coll] :: collection of items on Urbit (groups, apps, wikis, etc)
  ==
::
+$  coll  (set [=ship slug=@ta])
::
::  Pals
::
+$  pals-info
  $:  running=?
      pals=(map @p pal)
  ==
::
+$  pal  status=?(%leeche %target %mutual)
::
::  Groups
::
+$  groups-profile-key  ?(%bio %nickname %status %avatar %color %cover %groups)
::
::  Versioned Types
::
+$  info-field-0
  $%  [%text @t]
      [%date @da]
  ==
::
+$  info-field-1  info-field
::
+$  contact-0
  $:  info=(map @tas info-field-0)
      profile=(unit profile-0)
  ==
::
+$  contact-1
  $:  info=(map @tas info-field-0)
      profile=(unit profile-1)
  ==
::
+$  contact-2  contact
::
+$  contacts-0  (map (each @p @t) contact-0)
::
+$  contacts-1  (map (each @p @t) contact-1)
::
+$  contacts-2  (map (each @p @t) contact-2)
::
+$  field-def-0  [name=@t type=?(%text %date)]
::
+$  field-def-1  field-def
::
+$  fields-0  (list [@tas field-def-0])
::
+$  fields-1  (list [@tas field-def-1])
::
+$  self-0  info=(map @tas info-field-0)
::
+$  self-1  info=(map @tas [value=info-field-0 access=access-level])
::
+$  self-2  self
::
+$  profile-0
  $:  info=(map @tas info-field-0)
      fields=(map @tas field-def-0)
  ==
::
+$  profile-1
  $:  info=(map @tas [value=info-field-0 access=access-level])
      fields=(map @tas field-def-0)
  ==
::
+$  profile-2  profile
::
+$  pals-0  pals-info
::
--
