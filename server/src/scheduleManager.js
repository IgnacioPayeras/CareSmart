const client  = require('./database').client;
const moment = require('moment');

function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();    
    return isNaN(dayOfWeek) ? null : 
      ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'][dayOfWeek];

  }

  function dateToStringDate(date) {
    const day=date.getDate();
    const month=date.getMonth()+1;
    const year=date.getFullYear();
    return (year+"-"+month+"-"+day);

  }


  function isInside(hour,intervalStart,intervalEnd) {
    if((intervalStart<hour) & (hour<=intervalEnd)){
        return true;
    }
    return false;
  }

  function isColliding(x1,x2,y1,y2) {
    //// true if x inside y
    const isXInside=((y1<x1) & (x1<y2)) || ((y1<x2) & (x2<y2));/// (y1<x1<y2) || (y1<x2<y2)  
    //// true if y inside x
    const isyInside=((x1<y1) & (y1<x2)) || ((x1<y2) & (y2<x2));/// (x1<y1<x2) || (x1<y2<x2)  
    //// true if x=y
    const isEqual=(x1==y1) & (x2==y2);

    if(isXInside || isyInside || isEqual){
      return true;
    }

    return false;
  }

  function addMinutes(time,minutes){
    const s="2022-01-01"+" "+time;
    const oldDate = new Date(s);
    var newDate = moment(oldDate).add(minutes, 'm');
    result = newDate.format('HH:mm:ss');
    return result;

  }

  const getAvailableBlocks = async (rut,date) => {
    //// convert date to string
    const stringDate = dateToStringDate(date);
    //// convert date to day of week
    const day = getDayOfWeek(stringDate);
    console.log(stringDate)
    console.log(day)
  
    //// get medic time per attention
    const medicQuery = await client.query(`select * from doctor where rut=$1`, [rut]);
    const timePerAttention = medicQuery['rows'][0].attention_duration;
    console.log(timePerAttention + "min");
  
    //// get attention by date
    const attentionQuery = await client.query(`Select * from attention where (rut_doctor=$1 and date=$2) order by start_time`, [rut, stringDate]);
    const attentionList = new Array(attentionQuery.rowCount);
    var indexA = 0;
    for (var a = 0; a < attentionQuery.rowCount; a++) {
      const startOfAttention = await attentionQuery.rows[a]['start_time'];
      const endOfAttention = await attentionQuery.rows[a]['estimated_finish_time'];
      attentionList[a] = [startOfAttention, endOfAttention];
    }
    console.log("Attention list:");
    console.log(attentionList);
    console.log("");
  
    var availableList = new Array();
  
    //// get attention blocks of the day
    const attetionBlocksQuery = await client.query(`Select * from attention_block where (rut_doctor =$1 and weekday=$2) order by start_time`, [rut, day]);
    const blockList = new Array(attetionBlocksQuery.rowCount);
    for (var b = 0; b < attetionBlocksQuery.rowCount; b++) {
      const startOfTheBlock = await attetionBlocksQuery.rows[b]['start_time'];
      const endOfTheBlock = await attetionBlocksQuery.rows[b]['end_time'];
      var posibleAttentionStart = startOfTheBlock;
      blockList[b] = [startOfTheBlock, endOfTheBlock];
      console.log("Block: " + blockList[b]);
      /// create possible attention
      var posibleAttention = [posibleAttentionStart, addMinutes(posibleAttentionStart, timePerAttention)];
      while (isInside(posibleAttention[1], startOfTheBlock, endOfTheBlock)) {  /// while possible attention is inside the block
        //// check if it colides with another attention
        if (indexA < attentionList.length) { /// there is at least 1 attention left to compare
          /// if possible attention collides with an attention
          if (isColliding(posibleAttention[0],posibleAttention[1],attentionList[indexA][0], attentionList[indexA][1])) { 
            console.log(posibleAttention + " colides with: " + attentionList[indexA]);
            /// try next possible attention (at the end of the collition)
            posibleAttentionStart = attentionList[indexA][1];
            posibleAttention = [posibleAttentionStart, addMinutes(posibleAttentionStart, timePerAttention)];
            indexA++;
          }
          else { /// doesnt collide
            /// add it to the availableList
            availableList.push(posibleAttention);
            console.log(posibleAttention + " doesnt colide with: " + attentionList[indexA]);
            /// try next possible attention
            posibleAttentionStart = addMinutes(posibleAttentionStart, timePerAttention);
            posibleAttention = [posibleAttentionStart, addMinutes(posibleAttentionStart, timePerAttention)];
          }
        }
        else { /// no attentions left to compare every possible attention inside the block is valid
          /// add it to the possible attention list
          availableList.push(posibleAttention);
          console.log("possible attention: " + posibleAttention);
          /// try next possible attention
          posibleAttentionStart = addMinutes(posibleAttentionStart, timePerAttention);  
          posibleAttention = [posibleAttentionStart, addMinutes(posibleAttentionStart, timePerAttention)];
        }
      }
      console.log("//////////////////// end of the block //////////////////////////");
    }
  
    console.log("\n\n\n\n Not available:");
    console.log(attentionList);
    console.log("\n Available:");
    console.log(availableList);
    return(availableList);

  };




//// Test
(async () => {
    

    const query= await client.query('select * from attention');
    const testDate= query['rows'][0].date;
    const s="2022-12-19"+" "+"00:00:00";
    var aDate=new Date(s);
    const testTime=query['rows'][0].start_time;
    getAvailableBlocks('19.456.655-k',aDate);
    //const x=addMinutes("14:00:00",10);
    

}
)()



module.exports = {
    getAvailableBlocks
}