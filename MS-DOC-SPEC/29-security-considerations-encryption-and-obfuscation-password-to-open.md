# Security Considerations

## Encryption and Obfuscation (Password to Open)

When XOR obfuscation (section
[2.2.6.1](#Section_79dea1e94dce4fa08c6b56ba37b68351)) is used, data can
be easily extracted and the document password might be retrievable.

When obfuscation or encryption is used, the [ObjectPool
storage](#Section_f7983581d1074a1fb5f7f3650e777c04), [Macros
storage](#Section_a93e185e73b64db8865e7746766d5c6f), [Custom XML Data
storage](#Section_af8284c5025f4416bcb6f68f77625950), [XML Signatures
storage](#Section_cb3aae584966452f8ff088839f95a06d), and [Signatures
stream](#Section_38a3bf6330244988a97f7a50d322de52) are not obfuscated or
encrypted.

When XOR obfuscation (section 2.2.6.1) or Office binary document RC4
encryption (section
[2.2.6.2](#Section_3e9a4e92bdfe4379814474d033892ede)) is used or when
Office binary document RC4 CryptoAPI encryption (section
[2.2.6.3](#Section_55d29d8efd804c2da258ffdb7ed9e236)) is used with
**fDocProps** set to **false** in **EncryptionHeader**.**Flags**, the
[Document Summary
Information](#Section_7dc15eb9c84d4eb5844b0e78e072214f) stream and the
[Summary Information stream](#Section_6d38bfd5afdb412f831816a50ed48416)
are not obfuscated or encrypted.

When Office binary document RC4 encryption (section 2.2.6.2) or Office
binary document RC4 CryptoAPI encryption (section 2.2.6.3) is used, the
same block numbers are reused in the [WordDocument
stream](#Section_d7fae142670d4cd5869a708366984a71), the [Table
stream](#Section_44f62054d9114989946ca42100c26a15), and the entire [Data
stream](#Section_0218f8a661504695965c9abc8a685b81). This reuse can occur
potentially with known cleartext, implying that certain portions of
encrypted data can be directly extracted or easily retrieved.

See
[\[MS-OFFCRYPTO\]](%5bMS-OFFCRYPTO%5d.pdf#Section_3c34d72a1a614b52a893196f9157f083)
section 4.1.3 for additional security considerations with encryption and
obfuscation in Word binary files.
