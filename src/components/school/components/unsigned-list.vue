<template>
    <div class="unsigned" v-if="unsignList">
        <div class="top-box">
            <span class="total commen">共{{unsignList.length}}人未到</span>
            <span class="show-view commen">显示范围：<span>全部年级</span><span class="icons" @click="show=true"><van-icon name="arrow-down" /></span></span>
        </div>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text=""
                @load="onLoad"
        >
            <ul class="list">
                <li class="items" v-for="(item,index) in unsignList" :key="index">
                    <div class="name tabs">
                        <div class="t-middel">
                            <span class="text">{{item.name}}</span>
                            <span class="num">{{item.cardNo}}</span>
                        </div>
                    </div>
                    <div class="grade tabs">
                        <span>{{item.grade}}</span>
                    </div>
                    <div class="note tabs">
                        <span v-if="item.remark">{{item.remark}}</span>
                        <span v-if="!item.remark" style="text-align: center" @click="edetorStudent(item.id)"><van-icon name="edit" /></span>
                    </div>
                    <div class="btn tabs">
                        <button type="button" @click="signed(item.id)">签到</button>
                    </div>
                </li>
            </ul>
        </van-list>


        <GradeList></GradeList>
        <van-dialog
                v-model="dialogShow"
                show-cancel-button
                :before-close="beforeClose"
        >
            <van-field
                    v-model="message"
                    label="备注"
                    type="textarea"
                    placeholder="请输入备注20字符以内"
                    maxlength="20"
                    rows="2"
                    autosize
            />
        </van-dialog>
    </div>
</template>

<script>
    import {Icon, List, Actionsheet,Field,Toast } from 'vant';
    import GradeList from '../../common/grade-List';
    import { signed } from '@/api/school/attendance'
    import { updateStudent } from '@/api/school/student-manage'
    export default {
        name: "unsigned-list",
        props:{
          unsignList:{
              type:Array
          }
        },
        components:{
            [Icon.name]:Icon,
            [List.name]:List,
            [Actionsheet.name]:Actionsheet,
            [Field.name]:Field,
            [Toast.name]:Toast,
            GradeList:GradeList
        },
        data(){
            return{
                message:'',
                show:false,
                dialogShow:false,
                loading:false,
                finished:true,
                exitid:null,//保存要填写备注的学生id
            }
        },
        methods:{
            onLoad(){},
            beforeClose(action, done) {
                if (action === 'confirm') {
                    if (this.message){
                      updateStudent(this.exitid, {remark:this.message})
                        .then(res=>{
                            //console.log(res);
                            if (res.data.meta && res.data.meta.code === 0){
                               this.$emit("updateRemark");
                                done();
                            }
                        }).catch(()=>{
                            throw new Error("异常！")
                        })
                    }else {
                        Toast("请输入学生备注")
                    }
                } else {
                    done();
                }
            },
            //填写 备注
            edetorStudent(id){
                this.dialogShow=true;
                this.exitid = id;
            },
            //签到
            signed(id){
              signed(id)
                .then(res=>{
                    //console.log(res);
                    if (res.data.meta && res.data.meta.code === 0){
                        this.$emit("updateRemark");
                    }
                }).catch(()=>{
                    throw new Error("异常！")
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .unsigned{
        .top-box{
            padding: 0.16rem 0;
            overflow: hidden;
            border-bottom: 0.02rem solid #eee;
            box-sizing: border-box;
            .commen{
                font-size: 0.14rem;
                line-height: 0.2rem;
            }
            .total{
                float: left;
                color: #333;
            }
            .show-view{
                float: right;
                color: #666;
            }
        }
        .list{
            .items{
                border-bottom: 0.02rem solid #eee;
                height: 0.71rem;
                overflow: hidden;
                box-sizing: border-box;
                .tabs{
                    float: left;
                    height: 0.69rem;
                    padding: 0.1rem 0;
                    position: relative;
                    box-sizing: border-box;
                }
                .name{
                    width: 0.85rem;
                    .t-middel{
                        max-height: 0.51rem;
                        position: absolute;
                        top: 50%;
                        transform:translateY(-50%);
                        .text{
                            display: block;
                            font-size: 0.14rem;
                            color: #666;
                            line-height: 0.2rem;
                            margin-bottom: 0.02rem;
                        }
                        .num{
                            display: block;
                            font-size: 0.12rem;
                            color: #999;
                            line-height: 0.17rem;
                        }
                    }

                }
                .grade{
                    width: 0.7rem;
                    span{
                        font-size: 0.14rem;
                        color: #666;
                        line-height: 0.2rem;
                        max-height: 0.51rem;
                        position: absolute;
                        top: 50%;
                        transform:translateY(-50%);
                    }
                }
                .note{
                    width: 1.03rem;
                    color: #999;
                    line-height: 0.17rem;
                    margin-right: 0.26rem;
                    span{
                        position: absolute;
                        top: 50%;
                        transform:translateY(-50%);
                        font-size: 0.12rem;
                        display: inline-block;
                        width: 100%;
                        max-height: 0.51rem;
                        overflow: hidden;
                    }
                }
                .btn{
                    width: 0.58rem;
                    button{
                        width: 0.58rem;
                        height: 0.24rem;
                        font-size: 0.12rem;
                        color: #3770FB;
                        background-color: #fff;
                        outline: none;
                        border-radius: 0.05rem;
                        border: 0.01rem solid #3770FB;
                        position: absolute;
                        top: 50%;
                        transform:translateY(-50%);

                    }
                }
            }
        }
    }
</style>
