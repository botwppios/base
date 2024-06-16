const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, downloadContentFromMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const Jimp = require('jimp')
const { color } = require('./FUNÇÕES/JS/color');
const { getBuffer, fetchJson, fetchText, generateMessageID, getGroupAdmins, getMembros, getRandom, temporizador, recognize, bgcolor, isFiltered, addFilter, chyt, getExtension, convertSticker, nit, getpc, supre, FormData, runtime, adicionarLink } = require("./FUNÇÕES/JS/functions.js");
const { upload } = require('./FUNÇÕES/JS/tourl');
const settings = JSON.parse(fs.readFileSync('./FUNÇÕES/JSONS/settings.json'));

module.exports = zyon = async (zyon, mek, chatUpdate, store) => {
try {

//////////////// CONFIGURAÇÕES DO BOT ////////////////
const mek = chatUpdate.messages[0]
var info = mek
var m = mek

if (!mek.key.participant) mek.key.participant = mek.key.remoteJid
mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, "")
if (!mek.message) return
const fromMe = mek.key.fromMe
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const type = Object.keys(mek.message).find((key) => !["senderKeyDistributionMessage", "messageContextInfo"].includes(key))

var body = (type === "conversation") ?
           mek.message.conversation : 
           (type === "imageMessage") ?
           mek.message[type].caption : 
           (type === "videoMessage") ?
           mek.message[type].caption : 
           (type === "extendedTextMessage") ?
           mek.message[type].text : 
           (type === 'buttonsResponseMessage') ? 
           mek.message.buttonsResponseMessage.selectedButtonId : 
           (type === "listResponseMessage" && mek.message[type].singleSelectReply) ?
           mek.message.listResponseMessage.singleSelectReply.selectedRowId : 
           (type === "templateButtonReplyMessage") ? 
           mek.message.templateButtonReplyMessage.selectedId : 
           (type === "messageContextInfo" && mek.message[type].singleSelectReply) ?
           mek.message[type].singleSelectReply.selectedRowId : 
           (type === "client.sendMessageButtonMessage" && mek.message[type].selectedButtonId) ?
           mek.message[type].selectedButtonId : 
           (type === "stickerMessage" && mek.message[type].fileSha256 && 
           (mek.message[type].fileSha256.toString("base64")) !== null && 
           (mek.message[type].fileSha256.toString("base64")) !== undefined) ? 
           (mek.message[type].fileSha256.toString("base64")) : 
           (type == 'interactiveResponseMessage' && mek.message.interactiveResponseMessage && mek.message.interactiveResponseMessage.nativeFlowResponseMessage) ? 
           JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : 
           '';
const budy = (type === "conversation") ?
             mek.message.conversation : 
             (type === "extendedTextMessage" && mek.message.extendedTextMessage) ?
             mek.message.extendedTextMessage.text : 
             "";
var budy2 = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
var isCmd = body.trim().startsWith(settings.prefix);
const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const args = body.trim().split(/ +/).slice(1);
const argss = body.split(/ +/g)
const pushname = mek.pushName || "Sem nome"
const botNumber = await zyon.decodeJid(zyon.user.id)
const itsMe = mek.sender == botNumber ? true : false
const text = q = args.join(" ").trim()
const fatkuns = (mek.quoted)
const quoted = mek.quoted ? mek.quoted : mek;
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)

///////////////////////////////////////////////////////////


///////////// CONFIGURAÇÕES DE GRUPO //////////////////

const isGroup = from.endsWith("@g.us")
const groupMetadata = isGroup ? await zyon.groupMetadata(from): ""
const groupName = isGroup ? groupMetadata.subject : ''
const sender = isGroup ? mek.key.participant: mek.key.remoteJid
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const isUsers = isGroup ? groupMembers.includes(sender) : false
const isBot = info.key.fromMe ? true : false
const isBotGroupAdmins = isBotAdmins
const User = isUsers
const isGroupAdmins = isAdmins

/////////////////////////////////////////////////////////////////


///////////////////// CONFIG DADOS ////////////////////////

Dono = settings.NomeDoDono
Bot = settings.NomeDoBot
ZyonKey = settings.key
prefix = settings.prefix
const nmrdn = settings.NumeroDono.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
const isCreator = sender.includes(nmrdn)

/////////////////////////////////////////////////////////////////


///////////////////// OUTRAS FUNÇÕES ////////////////////

const adivinha = info.key.id.length > 21 ? 'Android ツ' : info.key.id.substring(0, 2) == '3A' ? 'IPhone ｯ' : 'WhatsApp web シ';
const reSize = async(buffer, ukur1, ukur2) => {
return new Promise(async(resolve, reject) => {
var baper = await Jimp.read(buffer);
var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
resolve(ab)
})
}
const getFileBuffer = async (mediakey, MediaType) => {
  
const stream = await downloadContentFromMessage(mediakey, MediaType)

let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}
const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms));
};

/////////////////////////////////////////////////////////////////


////////////////////// QUOTEDS /////////////////////////

const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')

///////////////////////////////////////////////////////////


/////////// PUXAR FOTO DOS USUÁRIOS //////////////

try { var pppusr = await zyon.profilePictureUrl(sender, 'image') 
} catch { var pppusr = 'https://telegra.ph/file/265c672094dfa87caea19.jpg' }
const buufferrr = await reSize(pppusr, 200, 200) 

///////////////////////////////////////////////////////////


//////////////////// DATA-HORA /////////////////////////////

const date = moment.tz('America/Sao_Paulo').format('DD/MM/YY');
const time = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const dataa = moment.tz('America/Sao_Paulo').format('DD/MM/YY');
const timestamp = speed()
const latensi = speed() - timestamp
neww = performance.now()
oldd = performance.now()
uptime = process.uptime()

/////////////////////////////////////////////////////////////////


//////////////////////// SELOS /////////////////////////

const selo = {key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 9999999,status: 200, thumbnail: buufferrr, surface: 200, message: `♻️ C〄M么NDO : ${prefix}${command}\n♻️ H〄R么 :  ${hora}`, orderTitle: 'xeon', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}

///////////////////////////////////////////////////////////


//////////////////////// REPLYS /////////////////////////

const reply = (teks) => {
zyon.sendMessage(from,
{text:teks, 
contextInfo:{ externalAdReply: 
{ showAdAttribution: true,
title: `‼️𝙉𝘼̃𝙊 𝘾𝙇𝙄𝙌𝙐𝙀 𝘼𝙌𝙐𝙄‼️`,
body: `Nome: ${pushname} `, 
previewType: "PHOTO",
thumbnailUrl: ``,
thumbnail:  buufferrr,
sourceUrl: "https://whatsapp.com/channel/0029VaZGpDmLCoX80H33T50h"}}}, 
{ quoted: info})}

/////////// MARCAÇÃO/MENÇÃO //////////////////////

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? zyon.sendMessage(from, {text: teks.trim(), mentions: memberr},{quoted: m}) : zyon.sendMessage(from, {text: teks.trim(), mentions: memberr},{quoted: m})
}

//////////////////////////////////////////////////////////


zyon.readMessages([mek.key])

if (!isGroup && isCmd) console.log( '┃ ┏━━━━━━ ', color('💠️𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐍𝐎 𝐏𝐕💠️','white'), '━━━','\n┃','┃',color('❱ 𝚅𝙴𝙻𝙾𝙲𝙸𝙳𝙰𝙳𝙴 :','white'),color(latensi.toFixed(4),'green'),'\n┃','┃',color('❱ 𝙽𝚄𝙼𝙴𝚁𝙾 :','white'),color(sender.split('@')[0],'yellow'),'\n┃','┃',color('❱ 𝙽𝙸𝙲𝙺 :','white'),color(pushname,'blue'),'\n┃','┃',color('❱ 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 :','white'),color(command,'red'),'\n┃','┃',color('❱ 𝙷𝙾𝚁𝙰𝚁𝙸𝙾 :','white'), color(time,'orange'),'\n┃',`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n┃`)

if (!isGroup && !isCmd) console.log( '┃ ┏━━━━━━ ', color('❄️𝐌𝐄𝐍𝐒𝐀𝐆𝐄𝐌 𝐍𝐎 𝐏𝐕❄️','white'), '━━━','\n┃','┃',color('❱ 𝚅𝙴𝙻𝙾𝙲𝙸𝙳𝙰𝙳𝙴 :','white'),color(latensi.toFixed(4),'green'),'\n┃','┃',color('❱ 𝙽𝚄𝙼𝙴𝚁𝙾 :','white'),color(sender.split('@')[0],'yellow'),'\n┃','┃',color('❱ 𝙽𝙸𝙲𝙺 :','white'),color(pushname,'blue'),'\n┃','┃',color('❱ 𝙼𝙴𝙽𝚂𝙰𝙶𝙴𝙼 :','white'),color(`${budy}`,'magenta'),'\n┃','┃',color('❱ 𝙷𝙾𝚁𝙰𝚁𝙸𝙾 :','white'), color(time,'orange'),'\n┃',`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n┃`)	

if (isCmd && isGroup) console.log( '┃ ┏━━━━━━', color('❄️𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐄𝐌 𝐆𝐑𝐔𝐏𝐎❄️','white'), '━━━','\n┃','┃',color('❱ 𝙶𝚁𝚄𝙿𝙾 :','white'), color(groupName,'blue'),'\n┃','┃',color('❱ 𝚅𝙴𝙻𝙾𝙲𝙸𝙳𝙰𝙳𝙴 :','white'),color(latensi.toFixed(4),'green'),'\n┃','┃',color('❱ 𝙽𝚄𝙼𝙴𝚁𝙾 :','white'),color(sender.split('@')[0],'yellow'),'\n┃','┃',color('❱ 𝙽𝙸𝙲𝙺 :','white'),color(pushname,'blue'),'\n┃','┃',color('❱ 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 :','white'),color(command,'red'),'\n┃','┃',color('❱ 𝙷𝙾𝚁𝙰𝚁𝙸𝙾 :','white'),color(time,'orange'),'\n┃',`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n┃`)

if (!isCmd && isGroup) console.log( '┃ ┏━━━━━━', color('❄️𝐌𝐄𝐍𝐒𝐀𝐆𝐄𝐌 𝐄𝐌 𝐆𝐑𝐔𝐏𝐎❄️','white'), '━━━','\n┃','┃',color('❱ 𝙶𝚁𝚄𝙿𝙾 :','white'), color(groupName,'blue'),'\n┃','┃',color('❱ 𝚅𝙴𝙻𝙾𝙲𝙸𝙳𝙰𝙳𝙴 :','white'),color(latensi.toFixed(4),'yellow'),'\n┃','┃',color('❱ 𝙽𝚄𝙼𝙴𝚁𝙾 :','white'),color(sender.split('@')[0],'green'),'\n┃','┃',color('❱ 𝙽𝙸𝙲𝙺 :','white'),color(pushname,'blue'),'\n┃','┃',color('❱ 𝙼𝙴𝙽𝚂𝙰𝙶𝙴𝙼 :','white'),color(`${budy}`,'magenta'),'\n┃','┃',color('❱ 𝙷𝙾𝚁𝙰𝚁𝙸𝙾 :','white'),color(time,'orange'),'\n┃',`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n┃`)

switch(command) {

case 'setprefix':
if(!isCreator) return reply(`Somente o ${Dono} pode usar esse comando`)
settings.prefix = q
fs.writeFileSync('./FUNÇÕES/JSONS/settings.json', JSON.stringify(settings, null, '\t'))
reply(`Prefixo alterado para: ${q}`)
break

case 'setnomebot':
if(!isCreator) return reply(`Somente o ${Dono} pode usar esse comando`)
settings.NomeDoBot = q
fs.writeFileSync('./FUNÇÕES/JSONS/settings.json', JSON.stringify(settings, null, '\t'))
reply(`Nome do bot alterado para: ${q}`)
break

case 'setowner':
if(!isCreator) return reply(`Somente o ${Dono} pode usar esse comando`)
settings.NumeroDono = q
fs.writeFileSync('./FUNÇÕES/JSONS/settings.json', JSON.stringify(settings, null, '\t'))
reply(`Numero do dono alterado para: ${q}`)
break

case 'setownername':
if(!isCreator) return reply(`Somente o ${Dono} pode usar esse comando`)
settings.NomeDoDono = q
fs.writeFileSync('./FUNÇÕES/JSONS/settings.json', JSON.stringify(settings, null, '\t'))
reply(`Nome do dono alterado para: ${q}`)
break

case 'setkey':
if(!isCreator) return reply(`Somente o ${Dono} pode usar esse comando`)
settings.key = q
fs.writeFileSync('./FUNÇÕES/JSONS/settings.json', JSON.stringify(settings, null, '\t'))
reply(`ApiKey alterada com sucesso`)
break

case 'play':
if(!q) return reply('Cade o nome?')
try {
api = await fetchJson(`http://us-02.bed.ovh:25717/download/play1?&nome=${q}&apitoken=${ZyonKey}`)
reply('aguarde..')
pla = `❗мυѕιca pedιda por @${sender.split('@')[0]}❗ 
título:${api.resultado.titulo}
views: ${api.resultado.visualizações}
canal: ${api.resultado.canal}
publicado: ${api.resultado.publicado}`
img = await getBuffer(api.resultado.thumb)
zyon.sendMessage(from,{image: img,thumbnail:null , caption: pla,contextInfo:{ mentionedJid:[sender]}})
buff = api.resultado
aud = await getBuffer(buff.link)
zyon.sendMessage(from,{audio:{ url: buff.audio}, mimetype: 'audio/mp4'})
} catch(e) {
console.log(e)
}
break

case 'igdl':
if(!q) return reply('Cade o link?')
instavideo = await fetchJson(`http://us-02.bed.ovh:25717/api/instamp4?url=${q}&apitoken=${ZyonKey}`)
down = await getBuffer(instavideo.resultado)
zyon.sendMessage(from,{video:down},{quoted:mek})
break

case 'pinterest':
if(!q) return reply('Cade a palavra?')
api = await getBuffer(`http://us-02.bed.ovh:25717/api/pinterest?text=${q}&apitoken=${ZyonKey}`)
zyon.sendMessage(from,{image:api},{quoted:mek})
break

case 'metadinha':
api = await fetchJson(`http://us-02.bed.ovh:25717/random/metadinha?apitoken=${ZyonKey}`)
zyon.sendMessage(from,{image:api.masculina},{quoted:mek})
zyon.sendMessage(from,{image:api.feminina},{quoted:mek})
break

case 'figurinhas':
if(!Number(q)) return reply(`Digite a quantidade de figurinhas\nExemplo: ${prefix+command} 7`)
if(q >= 100) return reply("Coloque abaixo de 100...")
if (isGroup) reply(`As figurinhas estão sendo enviadas em seu pv, por motivo de segurança e flood em grupos, aguarde um pouco.`)
async function figuss() {
var rnd = Math.floor(Math.random() * 8051)
zyon.sendMessage(sender, { sticker: { url: `http://us-02.bed.ovh:25717/random?apitoken=${ZyonKey}` } })}
for (i = 0; i < q; i++) {
await sleep(680)
figuss()
}
break

case 's': case 'f': case 'sgif': case 'sticker': {
if (!isQuotedImage && !isQuotedVideo) return reply(`Marque um video ou imagem com o comando ${prefix + command}`)
if(isQuotedImage) {
boij = isQuotedImage ? mek.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : mek.message.imageMessage
imgbuff = await getFileBuffer(boij, 'image')
imgname = getRandom('.'+await getExtension(boij.mimetype))
fs.writeFileSync(imgname, imgbuff)
ran = getRandom('.webp')
exec(`ffmpeg -i ${imgname} -vf scale=512:512 ${ran}`, async function(err, result) {
sti = fs.readFileSync(ran)
await zyon.sendMessage(from, {sticker: sti, contextInfo:{packname: `Solicitou:\nDono:\nFeito por:`, author: `${pushname}\n${Dono}\n${Bot}`}}, {quoted: mek})
fs.unlinkSync(imgname)
await fs.unlinkSync(ran)
})
} else if(isQuotedVideo) {
boij = isQuotedVideo ? mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : mek.message.videoMessage
imgbuff = await getFileBuffer(boij, 'video')
imgname = getRandom('.'+await getExtension(boij.mimetype))
fs.writeFileSync(imgname, imgbuff)
ran = getRandom('.webp')
exec(`ffmpeg -i ${imgname} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 200:200 ${ran}`, async function(err){
sti = fs.readFileSync(ran)
await zyon.sendMessage(from, {sticker: sti}, {quoted: mek})
fs.unlinkSync(imgname)
await fs.unlinkSync(ran)
})
}
}
break

case 'marvel':
case 'pornhub':
case 'stone':
case 'space':
case 'america':
case 'space':
case 'grafity':
case 'glitch3':
case 'gameplay':
var [txt1, txt2] = q.split("|")
anu = await fetchJson(`http://us-02.bed.ovh:25717/api/${command}?texto=${txt1}&texto2=${txt2}&apitoken=${ZyonKey}`)
img = await getBuffer(anu.resultado)
zyon.sendMessage(from,{image:img},{quoted:mek})
break

case "shadow":
case 'efeitoneon':
case 'cemiterio':
case 'metalgold':
case 'narutologo':
case 'fire':
case 'romantic':
case 'smoke':
case 'lovemsg':
case 'lovemsg2':
case 'lovemsg3':
case 'coffecup':
case 'coffecup2':
case 'cup':
case 'florwooden':
case 'madeira':
case 'lobometal':
case 'harryp':
case 'neon2':
textin = args.join(" ")
if(!textin) return reply(`cade o texto`) 
try {
bla = await fetchJson(`http://us-02.bed.ovh:25717/api/${command}?texto=${textin}&apitoken=${ZyonKey}`)
dllink = await getBuffer(bla.resultado.imageUrl)
zyon.sendMessage(from, {image: dllink}, {quoted: mek})
}catch(e) {
console.log(e)   
}
break

case 'menu':
teks = `
 [ ${Bot} ]
 
 INFOS:
 Nome: ${pushname}
 Dono: ${Dono}
 Numero dono: ${settings.NumeroDono}
 
 CMS DONO:
 ${p}setprefix
 ${p}setnomebot
 ${p}setowner
 ${p}setownername
 
 CMDS STICKERS:
 ${p}s
 ${p}sgif
 ${p}f
 ${p}sticker
 ${p}figurinhas
 
 CMDS DOWNLOADS:
 ${p}igdl
 ${p}metadinha
 ${p}pinterest
 ${p}play
 
 CMD EDITS:
 ${p}marvel
 ${p}pornhub
 ${p}stone
 ${p}space
 ${p}america
 ${p}space
 ${p}grafity
 ${p}glitch3
 ${p}gameplay
 ${p}efeitoneon
 ${p}cemiterio
 ${p}metalgold
 ${p}narutologo
 ${p}fire
 ${p}romantic
 ${p}smoke
 ${p}lovemsg
 ${p}lovemsg2
 ${p}lovemsg3
 ${p}coffecup
 ${p}coffecup2
 ${p}cup
 ${p}florwooden
 ${p}madeira
 ${p}lobometal
 ${p}harryp
 ${p}neon2
 
 [ ${Bot} ]
`
zyon.sendMessage(from,{image:{url: `https://telegra.ph/file/e1f2e9c228af071bf2292.jpg`},caption:teks},{quoted:mek})
break

default:

if (budy.startsWith('>')) {
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
await reply(String(err))
}
}

}
    } catch (err) {
        console.log(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Atualizado= ${__filename}`))
	delete require.cache[file]
	require(file)
})