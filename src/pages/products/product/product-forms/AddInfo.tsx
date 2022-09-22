import React from 'react';
import Input from "../../../../components/input/Input";
import { useFormik } from "formik";

const AddInfo = () => {

  const formik = useFormik({
    initialValues: {
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
      field8: '',
      field9: '',
    },

    onSubmit: values => {

      console.log(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div style={{
          width: '300px',
          height: '300px',
          backgroundColor: '#f1f1f1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          cursor: 'pointer'
        }}>
          Тут Будет фото
        </div>
        <Input title={'Энергетическая ценность'}
          name="field1"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.field1} />
        <Input title={'Белки, г'}
          name="field2"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.field2} />
        <Input title={'Доп поле для сайта'}
          name="Жиры,г"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.field3} />
        <Input title={'Углеводы, г'}
          name="field4"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.field4} />
        <Input title={'Срок годности'}
          name="field5"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.field5} />
        <Input title={'Состав'}
          name="field6"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.field6} />
        <Input title={'Условия хранения'}
          name="field7"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.field7} />
        <Input title={'Упаковка'}
          name="field8"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.field8} />
        <Input title={'Комплектация'}
          name="field9"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.field9} />
        <button style={{ marginTop: '40px' }} className='button' type='submit'>
          Сохранить
        </button>
      </div>
    </form>

  );
};

export default AddInfo;
