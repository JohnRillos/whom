/-  *whom
|%
::
++  default-field-list
  ^-  (list [key=@tas field-def])
  :~  :+  %first-name   'First Name'     %text
      :+  %middle-name  'Middle Name'    %text
      :+  %last-name    'Last Name'      %text
      :+  %nickname     'Nickname'       %text
      :+  %desc         'Description'    %text
      :+  %dob          'Date of Birth'  %date
      :+  %job          'Occupation'     %text
      :+  %address      'Address'        %text
      :+  %email        'Email'          %text
      :+  %phone        'Phone #'        %text
      :+  %website      'Website'        %text
      :+  %github       'Github'         %text
      :+  %twitter      'Twitter'        %text
  ==
::
++  default-fields
  ~+  (~(gas by *(map @tas field-def)) default-field-list)
::
++  field-util
  |_  field-map=(map @tas field-def)
  ::
  ++  field-list
    |^
    (sort ~(tap by field-map) sort-fields)
    ::
    ++  sort-fields
      |=  [a=[key=@tas def=field-def] b=[key=@tas def=field-def]]
      =/  a-default  ~+  (~(has by default-fields) key.a)
      =/  b-default  ~+  (~(has by default-fields) key.b)
      ?:  &(a-default b-default)  (sort-by-default-list a b)
      ?:  a-default  %.y
      ?:  b-default  %.n
      (aor name.def.a name.def.b)
    ::
    ++  sort-by-default-list
      |=  [a=[@tas field-def] b=[@tas field-def]]
      =/  index-a=(unit @)  ~+  (find [-.a]~ default-key-list)
      =/  index-b=(unit @)  ~+  (find [-.b]~ default-key-list)
      ?~  index-a  ~|  'Failed to sort fields'  !!
      ?~  index-b  ~|  'Failed to sort fields'  !!
      (lth u.index-a u.index-b)
    ::
    ++  default-key-list
      ~+  (turn default-field-list |=([key=@tas *] key))
    --
  ::
  ++  is-valid
    |=  [key=@tas val=info-field]
    =/  def=(unit field-def)  (~(get by field-map) key)
    ?~  def  %.n
    =(type.u.def -.val)
  --
--
