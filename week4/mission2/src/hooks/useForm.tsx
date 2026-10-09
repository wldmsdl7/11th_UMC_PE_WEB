import { useEffect, useState, type ChangeEvent } from "react";

interface userFormProps <T> {
    initialValue: T; // {email : '', password: ''}
    validate: (values: T) => Record<keyof T, string>
}

function useForm<T>({initialValue, validate}: userFormProps<T>) {
    const [values, setValues] = useState(initialValue);
    // 이메일 또는 비밀번호를 처음 입력할 때 에러 메세지를 띄우지 않기 위해 폼 태그를 클릭했는지 여부를 상태로 관리
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    // 이메일 -> 이메일 관련 에러, 비밀번호 -> 비밀번호 관련 에러
    const [errors, setErrors] = useState<Record<string, string>>({});

    // 사용자가 입력값을 변경할 때 실행되는 함수
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values, // 기존값은 유지 (불변성 유지)
            [name]: text // text만 변경
        })
    }

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        })
    }

    // email input, password input, 속성들을 가져오는 함수
    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => handleChange (name, e.target.value);
        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur}
    }

    // values가 변경될 때 마다 에러 검증 로직 실행
    useEffect(()=> {
        const newErrors: Record<keyof T, string> = validate(values);
        setErrors(newErrors); // 오류 메세지 업데이트 
    }, [validate, values]);

    return { values, errors, touched, getInputProps };
}

export default useForm