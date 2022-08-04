|%
+$  contact
  $:  ship=(unit @p)
      name=(unit tape)
  ==
::
+$  action
  $%  [%add-contact =contact]
  ==
::
+$  update
  $:  urbit-contacts=(map @p contact)
      earth-contacts=(map @t contact)
  ==
::
--
