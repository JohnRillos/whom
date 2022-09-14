|%
+$  contact
  $:  info=(map @tas info-field)
      :: (unit profile)
  ==
::
+$  self
  $:  info=(map @tas info-field)
      :: access levels
  ==
::
+$  profile
  $:  info=(map @tas info-field)
      :: field defs
  ==
::
+$  action
  $%  [%add-contact ship=(unit @p) =contact]
      [%del-contact key=(each @p @t)]
      [%edit-contact key=(each @p @t) info=(map @tas (unit info-field))]
      [%edit-contact-ship key=(each @p @t) ship=(unit @p)]
      [%add-field key=@tas def=field-def]
      [%del-field key=@tas]
      [%edit-self info=(map @tas (unit info-field))]
  ==
::
+$  field-def  [name=@t type=field-type-tag]
::
+$  field-type-tag  ?(%text %date)
::
+$  info-field
  $%  [%text @t]
      [%date @da]
  ==
::
+$  contacts-0  (map (each @p @t) contact)
::
+$  fields-0  (list [@tas field-def])
::
+$  self-0  self
::
+$  profile-0  profile
--
