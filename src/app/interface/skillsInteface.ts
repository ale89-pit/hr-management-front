export  interface SkillsInterface {
    idTipskill: number;
    tipologiaSkill: string|null|undefined;//nel file iniziale del db è impostato null per default
    isChecked: boolean|undefined;
    isCheckedByDefault: boolean|undefined;//risulta particolarmente utile se vuoi fare una checkbox con caselle gi selezionate iniziali
}