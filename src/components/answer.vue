<template>
  <div class="sort">
    1 、JS是单线程，先执行同步任务，再执行异步任务，异步任务分为微任务和宏任务，先执行微任务，在执行宏任务 <br>
    代码中 同步任务：console.log 函数调用 promise的初始化期间 <br>
    1. eventLoop // console.log<br>
    2. sync1 start // 函数调用<br>
    3. async2 //函数调用，promise的初始化期间<br>
    4. promise 2 // promise的初始化期间<br>
    5. promise 4 // promise的初始化期间<br>
    6. eventLoop end //console.log<br>
    再执行微任务，promise.then await 后的代码<br>
    7. async1 end<br>
    8. async3<br>
    9. promise2 then<br>
    10. promise4 then<br>
    在执行宏任务 setTimeout 同上先执行同步，在执行微任务<br>
    11. setTimeout 1<br>
    12. promise 1<br>
    13. promise then<br>
    async1() 改为 await async1(), 提高了自己内部代码的优先级，把下面的同步任务变成微任务，执行完在往下走<br>
    1. eventLoop // 同步代码<br>
    2. async1 start // 同步代码<br>
    3. async2 // 同步代码<br>
    4. async1 end // 微任务（async1内部）<br>
    5. async3 // 微任务（async1内部）<br>
    6. promise 2 // 微任务（原同步代码）<br>
    7. promise 4 // 微任务（原同步代码）<br>
    8. eventLoop end // 微任务（原同步代码）<br>
    9. promise2 then // 微任务<br>
    10. promise4 then // 微任务<br>
    11. setTimeout 1 // 宏任务<br>
    12. promise 1 // 宏任务中的同步代码<br>
    13. promise then // 宏任务中的微任务<br>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="less">
.sort {
  text-align: left;
  padding-left: 60px;
  margin-bottom: 40px;
}
</style>
