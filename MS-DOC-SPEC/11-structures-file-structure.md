# Structures

## File Structure

A Word Binary File is an [**OLE compound
file**](#gt_b39d4d3a-2d16-4bab-b9fd-ba8e1f16e6a4) as specified by
[\[MS-CFB\]](%5bMS-CFB%5d.pdf#Section_53989ce47b054f8d829bd08d6148375b).
The file consists of the following storages and streams.

### WordDocument Stream

The WordDocument stream MUST be present in the file and MUST have an
[**FIB**](#fib) at offset 0. It also contains the document text and
other information referenced from other parts of the file. The stream
has no predefined structure other than the **FIB** at the beginning.

In the context of Word Binary Files, the delay stream that is referenced
in
[\[MS-ODRAW\]](%5bMS-ODRAW%5d.pdf#Section_8560795e77594745838ff7f2ef2f1872)
is the WordDocument stream.

The WordDocument stream MUST NOT be larger than 0x7FFFFFFF bytes.

### 1Table Stream or 0Table Stream

Either the 1Table stream or the 0Table stream MUST be present in the
file. If the [**FIB**](#fib) at offset 0 in the [WordDocument
stream](#Section_d7fae142670d4cd5869a708366984a71) has
**base.fWhichTblStm** set to 1, this stream is called 1Table. Otherwise,
it is called 0Table.

If the document is encrypted as specified in section
[2.2.6](#Section_376393976451427b9cf201d56e927f25), this stream MUST
have an **EncryptionHeader** at offset 0, as specified in section 2.2.6.
If the document is not encrypted, this stream has no predefined
structure. Other than the possible **EncryptionHeader**, this stream
contains the data that is referenced from the **FIB** or from other
parts of the file.

This documentation refers to this stream as the *Table Stream*.

If a file contains both a 1Table and a 0Table stream, only the stream
that is referenced by **base.fWhichTblStm** is used. The unreferenced
stream MUST be ignored.

The Table Stream MUST NOT be larger than 0x7FFFFFFF bytes.

### Data Stream

The Data stream has no predefined structure. It contains data that is
referenced from the [**FIB**](#fib) or from other parts of the file.
This stream need not be present if there are no references to it.

The Data stream MUST NOT be larger than 0x7FFFFFFF bytes.

### ObjectPool Storage

The Object Pool storage contains storages for embedded [**OLE
objects**](#gt_cdff9514-a3fb-4897-941d-4e99193a0096). This storage need
not be present if there are no embedded OLE objects in the document.

The names of these storages are formed by locating the field of an OLE
object by field type ([2.9.90](#flt) flt) or CP ([character
position](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)), following
([2.4.6.2](#Section_be58bf9cd1d340cc91ee36452d7939b2) Direct Character
Formatting) to retrieve the sprmCPicLocation property
([2.6.1](#Section_7022285b962142e9ad4d4e02c115ef18) Character
Properties) for the field separator character (0x14) ([2.8.25](#plcfld)
Plcfld), converting that value to a string and prepending an underscore
"\_".

#### ObjInfo Stream

Each storage within the [ObjectPool
storage](#Section_f7983581d1074a1fb5f7f3650e777c04) contains a stream
whose name is "\003ObjInfo" where \003 is the character with value
0x0003, not the string literal "\003". This stream contains an
[**ODT**](#odt) structure which specifies information about that
embedded [**OLE object**](#gt_cdff9514-a3fb-4897-941d-4e99193a0096).

#### Print Stream

Each storage within the ObjectPool storage optionally contains a stream
whose name is "\003PRINT" where \003 is the character with value 0x0003,
not the string literal "\003". This stream contains an MFPF followed
immediately by a Metafile as specified in
[\[MS-WMF\]](%5bMS-WMF%5d.pdf#Section_4813e7fd52d04f42965f228c8b7488d2).
If no PRINT or [EPRINT
stream](#Section_e385ef5f055f476e9237061aa7deb5f9) is present, then the
object does not have a print presentation distinct from its screen
presentation.

#### EPrint Stream

Each storage within the ObjectPool storage optionally contains a stream
whose name is "\003EPRINT" where \003 is the character with value
0x0003, not the string literal "\003".<span id="Appendix_A_Target_1"
class="anchor"></span>[\<1\>](#Appendix_A_1) This stream contains an
Enhanced Metafile, as specified in
[\[MS-EMF\]](%5bMS-EMF%5d.pdf#Section_91c257d7c39d4a369b1f63e3f73d30ca),
to be used when printing the object. If no EPRINT or [PRINT
stream](#Section_31166a0347c249828f1da5aa606b7e70) is present, then the
object does not have a print presentation distinct from its screen
presentation.

### Custom XML Data Storage

The Custom XML Data storage is an optional storage whose name MUST be
"MsoDataStore".

The contents of the storage are specified in
[\[MS-OSHARED\]](%5bMS-OSHARED%5d.pdf#Section_d93502fa5b8f4f47a3fe5574046f4b8d)
section 2.3.6.

### Summary Information Stream

The Summary Information stream is an optional stream whose name MUST be
"\005SummaryInformation", where \005 is the character with value 0x0005,
and not the string literal "\005".

The contents of this stream are specified in
[\[MS-OSHARED\]](%5bMS-OSHARED%5d.pdf#Section_d93502fa5b8f4f47a3fe5574046f4b8d)
section 2.3.3.2.1.

### Document Summary Information Stream

The Document Summary Information stream is an optional stream whose name
MUST be "\005DocumentSummaryInformation", where \005 is the character
with value 0x0005, not the string literal "\005".

The contents of this stream are specified in
[\[MS-OSHARED\]](%5bMS-OSHARED%5d.pdf#Section_d93502fa5b8f4f47a3fe5574046f4b8d)
section 2.3.3.2.2.

### Encryption Stream

The Encryption stream is an optional stream whose name MUST be
"encryption". The format of this stream is specified in section
[2.2.6.3](#Section_55d29d8efd804c2da258ffdb7ed9e236). This stream MUST
NOT be present unless both of the following conditions are met:

- The document is encrypted with Office Binary Document RC4 CryptoAPI
  Encryption (section 2.2.6.3).

- The **fDocProps** value is set in the **EncryptionHeader**.**Flags**.

### Macros Storage

The Macros storage is an optional storage that contains the macros for
the file. If present, it MUST be a Project Root Storage as defined in
[\[MS-OVBA\]](%5bMS-OVBA%5d.pdf#Section_575462babf6741909facc275523c75fc)
section 2.2.1.

### XML Signatures Storage

The [**XML**](#gt_982b7f8e-d516-4fd5-8d5e-1a836081ed85) signatures
storage is an optional storage whose name MUST be "\_xmlsignatures".
This storage contains [**digital
signatures**](#gt_ad0cf6e3-05c3-482d-ab0f-617f91871189) as specified in
[\[MS-OFFCRYPTO\]](%5bMS-OFFCRYPTO%5d.pdf#Section_3c34d72a1a614b52a893196f9157f083)
section 2.5.2.4. This storage MAY<span id="Appendix_A_Target_2"
class="anchor"></span>[\<2\>](#Appendix_A_2) be ignored.

### Signatures Stream

The signatures stream is an optional stream whose name MUST be
"\_signatures". This stream contains [**digital
signatures**](#gt_ad0cf6e3-05c3-482d-ab0f-617f91871189) as specified in
[\[MS-OFFCRYPTO\]](%5bMS-OFFCRYPTO%5d.pdf#Section_3c34d72a1a614b52a893196f9157f083)
section 2.5.1. This stream MAY<span id="Appendix_A_Target_3"
class="anchor"></span>[\<3\>](#Appendix_A_3) be ignored.

### Information Rights Management Data Space Storage

The Information Rights Management Data Space storage is an optional
storage whose name MUST be "\006DataSpaces", where \006 is the character
with value 0x0006, and not the string literal "\006". This storage is
specified in
[\[MS-OFFCRYPTO\]](%5bMS-OFFCRYPTO%5d.pdf#Section_3c34d72a1a614b52a893196f9157f083)
section 2.2.

If this storage is present, the [Protected Content
Stream](#Section_4e67943d659a4b349e0376cb4a6c40fb) MUST also be present.

If this storage is present, all specified streams and storages other
than this storage and the Protected Content Stream
SHOULD<span id="Appendix_A_Target_4"
class="anchor"></span>[\<4\>](#Appendix_A_4) be read from the Protected
Content Stream as specified in \[MS-OFFCRYPTO\] section 1.3.2 and if any
of those streams and storages exist outside of the Protected Content
Stream, they SHOULD<span id="Appendix_A_Target_5"
class="anchor"></span>[\<5\>](#Appendix_A_5) be ignored.

### Protected Content Stream

The Protected Content Stream is an optional stream whose name MUST be
"\009DRMContent", where \009 is the character with value 0x0009, and not
the string literal "\009". This storage is specified in
[\[MS-OFFCRYPTO\]](%5bMS-OFFCRYPTO%5d.pdf#Section_3c34d72a1a614b52a893196f9157f083)
section 2.2.10.

If this stream is present, the [Information Rights Management Data Space
Storage](#Section_1d3b751562574fcb86508a6bbead9b76) MUST also be
present.
