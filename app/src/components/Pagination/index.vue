<template>
    <div class="pagination">
        <button :disabled="pageNo===1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo===1}">1</button>      
        <button v-if="startNumAndEndNum.start>2">···</button>
        <!--中间部分 -->
        <button 
        v-for="(page,index) in startNumAndEndNum.end" 
        :key="index" 
        v-if="page>=startNumAndEndNum.start"
        @click="$emit('getPageNo',page)"
        :class="{active:pageNo===page}">
        {{page}}
    </button>
       

        <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
        <button 
        v-if="startNumAndEndNum.end<totalPage" 
        @click="$emit('getPageNo',totalPage)" 
        :class="{active:pageNo===totalPage}">
        {{totalPage}}</button>
        <button :disabled="pageNo===totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{total}} 条</button>
       
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:['pageNo','pageSize','total','continues'],
        computed:{
            // 计算出总共多少也
            totalPage(){
                return Math.ceil(this.total/this.pageSize)
            },
          //计算出连续的页码的起始数字和结束数字[连续页码的数字：至少是5]
          startNumAndEndNum(){
            const {continues,pageNo,totalPage}=this
            // 先定义两个变量存储起始和结束的数字
            let start=0,end=0
            // 连续页码数字5（就是至少5页），如果出现不正常的现象(就是数据不够5页)
            // 不正常现象(总页数小于连续页码数)
            if(continues>totalPage){
               start=1,
               end=totalPage
            }else{
                // 正常现象(总页数一定大于5)
                start=pageNo-parseInt(continues/2)
                // 如果当前是第8页 连续页码5  6 7 8 9 10
                // 如果当前是第8页 连续页码7  5 6 7 8 9 10 11               
                end=pageNo+parseInt(continues/2)

                // 把出现不正常的现象（start数字出现0或负数）纠正
                if(start<1){
                    start=1
                    end=continues
                }
                //// 把出现不正常的现象（end数字大于页码总数）纠正 
                if(end>totalPage){
                    start=totalPage-(continues-1)
                    end=totalPage
                }
            }
            return {start,end}
          }
        }
    }
</script>

<style lang="less" scoped>
    .pagination {
        text-align: center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>