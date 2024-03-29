import React, { Component } from 'react';
import { connect } from 'dva';
import address from '@/utils/address';
import { postImg } from '@/services/api';
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    message,
    Drawer, Checkbox, Cascader, Upload, Icon, Modal, Radio
} from 'antd';

@Form.create()
@connect(({ company, loading }) => ({
    company,
    loading: loading.models.company,
}))
class DrawereComponent extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        yewu: [],
        yewu2: [],
        yewu3: []
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    uploadButton = () => (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    handleSubmitAddCompany = async () => {
        let { getFieldsValue } = this.props.form;
        let data = getFieldsValue();
        if (this.state.fileList.length !== 0 && this.state.fileList[0].thumbUrl) {
            data.companyLogo = (await postImg({
                imgData: this.state.fileList[0].thumbUrl
            })).imgPath;
        } else {
            message.error('请上传公司logo', 1.5);
            return;
        }
        data.guimo = Number(data.guimo);
        for (let item in data) {
            if (data[item] === undefined) {
                message.error('未填写完整', 1.5);
                return;
            }
        }
        let { dispatch } = this.props;
        data.yewu = this.state.yewu;//主营业务
        data.yewu2 = this.state.yewu2;//次营业务
        data.yewu3 = this.state.yewu3;//其他业务
        dispatch({
            type: 'company/addCompany',
            payload: data,
            callback: () => {
                this.props.onClose('addCompanyVisible');
            }
        })
    }

    onChange = (value, arg2) => {
        if (arg2 && arg2 === 2) {
            if (value.length > 5) {
                message.error('最多选择5个', 1.5)
                return false;
            } else {
                this.setState({
                    yewu2: value,
                });
            }

        } else if (arg2 && arg2 === 3) {
            if (value.length > 3) {
                message.error('最多选择3个', 1.5)
                return false;
            } else {
                this.setState({
                    yewu3: value,
                });
            }
        } else {
            if (value.length > 1) {
                message.error('最多选择1个', 1.5)
                return false;
            } else {
                this.setState({
                    yewu: value,
                });
            }
        }

    };

    render() {
        const { fileList, previewVisible, previewImage, yewu, yewu2, yewu3 } = this.state;
        const {
            form: { getFieldDecorator },
        } = this.props;
        const options = [
            { label: '信贷', value: '信贷' },
            { label: '车贷', value: '车贷' },
            { label: '房贷', value: '房贷' },
            { label: '垫资', value: '垫资' },
            { label: '企业贷', value: '企业贷' },
            { label: '生意贷', value: '生意贷' },
            { label: '装修贷', value: '装修贷' },
            { label: '综合金融', value: '综合金融' },
        ];
        const yewuOptions = [
            { label: '公积金贷', value: '公积金贷' },
            { label: '保单贷', value: '保单贷' },
            { label: '社保贷', value: '社保贷' },
            { label: '按揭房贷', value: '按揭房贷' },
            { label: '打卡工资贷', value: '打卡工资贷' },
            { label: '退休金贷', value: '退休金贷' },
            { label: '微粒贷', value: '微粒贷' },
            { label: '信用卡贷', value: '信用卡贷' },
            { label: '同业贷', value: '同业贷' },
            { label: '营业执照贷', value: '营业执照贷' },
            { label: '国企事业单位贷', value: '国企事业单位贷' },
            { label: '银行车抵贷', value: '银行车抵贷' },
            { label: '机构车抵贷', value: '机构车抵贷' },
            { label: '银行车信贷', value: '银行车信贷' },
            { label: '银行房抵贷', value: '银行房抵贷' },
            { label: '民间房抵贷', value: '民间房抵贷' },
            { label: '民间一对一', value: '民间一对一' },
            { label: '公司资金垫资', value: '公司资金垫资' },
            { label: '企业税贷', value: '企业税贷' },
            { label: '企业信贷', value: '企业信贷' },
            { label: '企业资产抵押贷', value: '企业资产抵押贷' },
        ];
        return (
            <Drawer
                title="新增公司信息"
                width={720}
                onClose={() => this.props.onClose('addCompanyVisible')}
                visible={this.props.drawerVisible}
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="公司logo">
                                <div className="clearfix">
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                        accept="image/*"
                                    >
                                        {fileList.length >= 1 ? null : this.uploadButton()}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="公司全称">
                                {getFieldDecorator('companyName', {
                                    rules: [{ required: true, message: '填写公司全称' }],
                                })(<Input placeholder="填写公司全称" />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="公司简称">
                                {getFieldDecorator('shortName', {
                                    rules: [{ required: true, message: '填写公司简称' }],
                                })(<Input placeholder="填写公司简称" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="人数规模">
                                {getFieldDecorator('guimo', {
                                    rules: [{ required: true, message: '填写人数规模' }],
                                })(<Input placeholder="填写人数规模" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="主营业务">
                                <Checkbox.Group options={options} value={yewu} onChange={this.onChange} />
                            </Form.Item>
                            <Form.Item label="次营业务">
                                <Checkbox.Group options={yewuOptions} value={yewu2} onChange={(e) => this.onChange(e, 2)} />
                            </Form.Item>
                            {/* <Form.Item label="其他业务">
                                <Checkbox.Group options={options} value={yewu3} onChange={(e) => this.onChange(e, 3)} />
                            </Form.Item> */}

                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="选择公司区域">
                                {getFieldDecorator('addressQuyu', {
                                    rules: [{ required: true, message: '选择公司区域' }],
                                })(
                                    <Cascader options={address} placeholder="选择公司区域" />,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="详细地址">
                                {getFieldDecorator('address', {
                                    rules: [{ required: true, message: '输入详细地址' }],
                                })(<Input placeholder="输入详细地址" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="联系人姓名">
                                {getFieldDecorator('lxrName', {
                                    rules: [{ required: true, message: '联系人姓名' }],
                                })(<Input placeholder="联系人姓名" />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="联系人电话">
                                {getFieldDecorator('lxrTel', {
                                    rules: [{ required: true, message: '联系人电话' }],
                                })(<Input placeholder="联系人电话" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="公司简介">
                                {getFieldDecorator('description', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '公司简介',
                                        },
                                    ],
                                })(<Input.TextArea rows={4} placeholder="公司简介" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={() => this.props.onClose('addCompanyVisible')} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={this.handleSubmitAddCompany} type="primary" htmlType="submit">
                        提交
                    </Button>
                </div>
            </Drawer>
        )
    }
}

export default DrawereComponent