import { ValidationError } from '../../../../error/validation-error';
import { DeleteFromCartCommand } from '../../../application/port/in/delete-from-cart.command';

/**
 * 外部からリクエストするためのコマンド
 * 入力用インターフェースを実装する
 */
export class DeleteFromCartCommandRequest implements DeleteFromCartCommand {
  private constructor(
    public readonly id: number,
) {}

  /**
   * コマンドを生成するための名前付きコンストラクタ
   * リクエストのため、バリデーションも行う
   *
   * @param id
   * @returns
   */
  public static createCommand(
    id: number,
  ): [DeleteFromCartCommand, null] | [null, ValidationError[]] {
    const errors: ValidationError[] = [];

    // バリデーション
    // バリデーションエラーは全て返す様にする
    // このエラーはログに残すことは考えていないが、呼び出し側が表示する可能性がある。
    // @TODO: バリデーションエラーに持たせるべき情報を考える
    // 一旦なし
    // if (!userUuid) {
    //   errors.push(new ValidationError('userUuid', 'userUuid is required'));
    // }
    // if (!cartCode) {
    //   errors.push(new ValidationError('cartCode', 'cartCode is required'));
    // }
    // if (!sku) {
    //   errors.push(new ValidationError('sku', 'sku is required'));
    // }
    // if (!sku.skuCode) {
    //   errors.push(new ValidationError('sku.skuCode', 'sku.skuCode is required'));
    // }
    // if (!sku.price) {
    //   errors.push(new ValidationError('sku.price', 'sku.price is required'));
    // }
    // if (!quantity) {
    //   errors.push(new ValidationError('quantity', 'quantity is required'));
    // }
    // else if (quantity <= 0) {
    //   errors.push(new ValidationError('quantity', 'quantity must be greater than 0'));
    // }

    // // バリデーションに1件でも引っかかればエラーとする
    // if (errors.length > 0) {
    //   return [null, errors];
    // }

    // エラーがない場合は、コマンドを含むTupleを返す
    return [new DeleteFromCartCommandRequest(id), null];
  }
}
